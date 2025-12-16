import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
    // ==================== AUTH FIELDS ====================
    @Prop({ required: true, unique: true })
    contactNumber: string;

    @Prop({ required: true })
    password: string;

    // Password reset OTP fields
    @Prop()
    resetOtp?: string;

    @Prop()
    resetOtpExpiry?: Date;

    // ==================== PERSONAL INFO ====================
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true, enum: ['male', 'female', 'other'] })
    gender: 'male' | 'female' | 'other';

    @Prop({ required: true, enum: ['individual', 'business'] })
    profileType: 'individual' | 'business';

    @Prop({ enum: ['single', 'married', 'divorced'] })
    maritalStatus?: 'single' | 'married' | 'divorced';

    @Prop()
    profilePicUrl?: string;

    // ==================== ABOUT ====================
    @Prop()
    introduction?: string;

    @Prop()
    personality?: string;

    @Prop({ type: [String] })
    interests?: string[];

    // ==================== LOCATION ====================
    @Prop()
    hometown?: string;

    @Prop({ required: true })
    city: string;

    @Prop()
    address?: string;

    // ==================== LIFESTYLE PREFERENCES ====================
    @Prop({ enum: ['veg', 'non-veg', 'both'] })
    foodPreference?: 'veg' | 'non-veg' | 'both';

    @Prop({ enum: ['yes', 'no', 'occasionally'] })
    drinking?: 'yes' | 'no' | 'occasionally';

    @Prop({ enum: ['yes', 'no'] })
    smoking?: 'yes' | 'no';

    @Prop({ enum: ['yes', 'no'] })
    pets?: 'yes' | 'no';

    @Prop({ enum: ['self', 'shared', 'maid'] })
    roomCleaning?: 'self' | 'shared' | 'maid';

    @Prop({ enum: ['day', 'night', 'flexible'] })
    workSchedule?: 'day' | 'night' | 'flexible';

    // ==================== STATUS ====================
    @Prop({ default: true })
    isActive: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

