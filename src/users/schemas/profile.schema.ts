import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
    // Ownership (optional - can be linked later)
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId?: Types.ObjectId;

    // Personal Info
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

    // About
    @Prop()
    introduction?: string;

    @Prop()
    personality?: string;

    @Prop({ type: [String] })
    interests?: string[];

    // Location
    @Prop()
    hometown?: string;

    @Prop({ required: true })
    city: string;

    @Prop()
    address?: string;

    // Lifestyle Preferences
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

    // Contact
    @Prop()
    contactNumber?: string;

    // Status
    @Prop({ default: true })
    isActive: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
