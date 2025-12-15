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
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { contactNumber, password } = registerDto;

        // Check if user already exists
        const existingUser = await this.userModel.findOne({ contactNumber });
        if (existingUser) {
            throw new ConflictException('User with this contact number already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new this.userModel({
            contactNumber,
            password: hashedPassword,
        });
        await user.save();

        // Generate token
        const token = this.generateToken(user);

        return {
            message: 'User registered successfully',
            userId: user._id,
            token,
        };
    }

    async login(loginDto: LoginDto) {
        const { contactNumber, password } = loginDto;

        // Find user
        const user = await this.userModel.findOne({ contactNumber });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new UnauthorizedException('Account is deactivated');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate token
        const token = this.generateToken(user);

        return {
            message: 'Login successful',
            userId: user._id,
            token,
        };
    }

    async findAll() {
        return this.userModel.find().select('-password').exec();
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id).select('-password').exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async changePassword(userId: string, oldPassword: string, newPassword: string) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return { message: 'Password changed successfully' };
    }

    async deactivate(id: string) {
        const user = await this.userModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .select('-password')
            .exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return { message: 'User deactivated successfully', user };
    }

    async delete(id: string) {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return { message: 'User deleted successfully' };
    }

    private generateToken(user: UserDocument) {
        const payload = { sub: user._id, contactNumber: user.contactNumber };
        return this.jwtService.sign(payload);
    }
}
