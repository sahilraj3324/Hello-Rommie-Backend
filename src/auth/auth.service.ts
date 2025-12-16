import {
    Injectable,
    UnauthorizedException,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Profile, ProfileDocument } from '../users/schemas/profile.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const { contactNumber, password } = loginDto;

        // Find profile
        const profile = await this.profileModel.findOne({ contactNumber });
        if (!profile) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check if profile is active
        if (!profile.isActive) {
            throw new UnauthorizedException('Account is deactivated');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, profile.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate token
        const token = this.generateToken(profile);

        return {
            message: 'Login successful',
            profileId: profile._id,
            token,
        };
    }

    async findAll() {
        return this.profileModel.find().select('-password -resetOtp -resetOtpExpiry').exec();
    }

    async findOne(id: string) {
        const profile = await this.profileModel.findById(id).select('-password -resetOtp -resetOtpExpiry').exec();
        if (!profile) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }
        return profile;
    }

    async changePassword(profileId: string, oldPassword: string, newPassword: string) {
        const profile = await this.profileModel.findById(profileId);
        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, profile.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        profile.password = await bcrypt.hash(newPassword, 10);
        await profile.save();

        return { message: 'Password changed successfully' };
    }

    async deactivate(id: string) {
        const profile = await this.profileModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .select('-password -resetOtp -resetOtpExpiry')
            .exec();
        if (!profile) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }
        return { message: 'Profile deactivated successfully', profile };
    }

    async delete(id: string) {
        const profile = await this.profileModel.findByIdAndDelete(id).exec();
        if (!profile) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }
        return { message: 'Profile deleted successfully' };
    }

    // ==================== FORGOT PASSWORD METHODS ====================

    async requestPasswordReset(contactNumber: string) {
        const profile = await this.profileModel.findOne({ contactNumber });
        if (!profile) {
            throw new NotFoundException('Profile with this contact number not found');
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        // Hash OTP before storing
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Save OTP to profile
        profile.resetOtp = hashedOtp;
        profile.resetOtpExpiry = otpExpiry;
        await profile.save();

        // TODO: Integrate SMS service here to send OTP
        // For now, returning OTP in response (REMOVE IN PRODUCTION)
        console.log(`[DEV] Password reset OTP for ${contactNumber}: ${otp}`);

        return {
            message: 'OTP sent successfully',
            // REMOVE THIS IN PRODUCTION - only for testing
            otp: otp,
        };
    }

    async verifyResetOtp(contactNumber: string, otp: string) {
        const profile = await this.profileModel.findOne({ contactNumber });
        if (!profile) {
            throw new NotFoundException('Profile with this contact number not found');
        }

        if (!profile.resetOtp || !profile.resetOtpExpiry) {
            throw new UnauthorizedException('No password reset request found. Please request a new OTP.');
        }

        // Check if OTP is expired
        if (new Date() > profile.resetOtpExpiry) {
            throw new UnauthorizedException('OTP has expired. Please request a new one.');
        }

        // Verify OTP
        const isOtpValid = await bcrypt.compare(otp, profile.resetOtp);
        if (!isOtpValid) {
            throw new UnauthorizedException('Invalid OTP');
        }

        return { message: 'OTP verified successfully', verified: true };
    }

    async resetPassword(contactNumber: string, otp: string, newPassword: string) {
        const profile = await this.profileModel.findOne({ contactNumber });
        if (!profile) {
            throw new NotFoundException('Profile with this contact number not found');
        }

        if (!profile.resetOtp || !profile.resetOtpExpiry) {
            throw new UnauthorizedException('No password reset request found. Please request a new OTP.');
        }

        // Check if OTP is expired
        if (new Date() > profile.resetOtpExpiry) {
            throw new UnauthorizedException('OTP has expired. Please request a new one.');
        }

        // Verify OTP
        const isOtpValid = await bcrypt.compare(otp, profile.resetOtp);
        if (!isOtpValid) {
            throw new UnauthorizedException('Invalid OTP');
        }

        // Hash new password and update
        profile.password = await bcrypt.hash(newPassword, 10);
        profile.resetOtp = undefined;
        profile.resetOtpExpiry = undefined;
        await profile.save();

        return { message: 'Password reset successfully' };
    }

    private generateToken(profile: ProfileDocument) {
        const payload = { sub: profile._id, contactNumber: profile.contactNumber };
        return this.jwtService.sign(payload);
    }
}

