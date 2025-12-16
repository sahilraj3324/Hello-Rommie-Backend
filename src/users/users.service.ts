import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) { }

  async create(createProfileDto: CreateProfileDto) {
    const { contactNumber, password, ...restOfDto } = createProfileDto;

    // Check if profile with this contact number already exists
    const existingProfile = await this.profileModel.findOne({ contactNumber });
    if (existingProfile) {
      throw new ConflictException('Profile with this contact number already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create profile
    const createdProfile = new this.profileModel({
      contactNumber,
      password: hashedPassword,
      ...restOfDto,
    });
    const savedProfile = await createdProfile.save();

    // Return profile without sensitive fields
    const { password: _, resetOtp: __, resetOtpExpiry: ___, ...safeProfile } = savedProfile.toObject();
    return safeProfile;
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel
      .find({ isActive: true })
      .select('-password -resetOtp -resetOtpExpiry')
      .exec();
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileModel
      .findById(id)
      .select('-password -resetOtp -resetOtpExpiry')
      .exec();
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async findByContactNumber(contactNumber: string): Promise<Profile> {
    const profile = await this.profileModel
      .findOne({ contactNumber })
      .select('-password -resetOtp -resetOtpExpiry')
      .exec();
    if (!profile) {
      throw new NotFoundException(`Profile with contact number ${contactNumber} not found`);
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    // Don't allow password update through this method
    const { password, ...safeUpdateDto } = updateProfileDto as any;

    const updatedProfile = await this.profileModel
      .findByIdAndUpdate(id, safeUpdateDto, { new: true })
      .select('-password -resetOtp -resetOtpExpiry')
      .exec();
    if (!updatedProfile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return updatedProfile;
  }

  async remove(id: string): Promise<Profile> {
    const deletedProfile = await this.profileModel.findByIdAndDelete(id).exec();
    if (!deletedProfile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return deletedProfile;
  }

  async deactivate(id: string): Promise<Profile> {
    const profile = await this.profileModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .select('-password -resetOtp -resetOtpExpiry')
      .exec();
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }
}

