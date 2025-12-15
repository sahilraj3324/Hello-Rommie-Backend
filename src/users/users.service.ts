import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) { }

  async create(userId: string, createProfileDto: CreateProfileDto): Promise<Profile> {
    const createdProfile = new this.profileModel({
      ...createProfileDto,
      userId: new Types.ObjectId(userId),
    });
    return createdProfile.save();
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id).exec();
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async findByUserId(userId: string): Promise<Profile> {
    const profile = await this.profileModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .exec();
    if (!profile) {
      throw new NotFoundException(`Profile for user ${userId} not found`);
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const updatedProfile = await this.profileModel
      .findByIdAndUpdate(id, updateProfileDto, { new: true })
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
      .exec();
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }
}
