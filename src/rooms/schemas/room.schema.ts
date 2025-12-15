import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
    // Ownership
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId?: Types.ObjectId;

    // Location
    @Prop({ required: true })
    city: string;

    @Prop()
    landmark?: string;

    // Room Details
    @Prop({ required: true, enum: ['private', 'shared', 'entire'] })
    roomType: 'private' | 'shared' | 'entire';

    @Prop()
    sizeSqFt?: number;

    @Prop({ default: false })
    parking: boolean;

    // Description
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    // Amenities
    @Prop({ type: [String], default: [] })
    amenities: string[];

    // Pricing
    @Prop({ required: true })
    rentAmount: number;

    @Prop()
    securityDeposit?: number;

    // Media
    @Prop()
    coverImageUrl?: string;

    @Prop({ type: [String], default: [] })
    imageUrls: string[];

    // Publishing Lifecycle
    @Prop({ enum: ['draft', 'published', 'unpublished'], default: 'draft' })
    status: 'draft' | 'published' | 'unpublished';

    @Prop()
    publishedAt?: Date;

    @Prop()
    unpublishedAt?: Date;

    // System
    @Prop({ default: true })
    isActive: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
