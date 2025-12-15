import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
    // Ownership
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId?: Types.ObjectId;

    // Location
    @Prop({ required: true })
    city: string;

    @Prop()
    landmark?: string;

    // Item Details
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    category: string;

    @Prop()
    conditionAgeMonths?: number;

    // Description
    @Prop()
    description?: string;

    @Prop({ type: [String], default: [] })
    tags?: string[];

    // Pricing
    @Prop({ required: true })
    price: number;

    @Prop({ default: false })
    isNegotiable: boolean;

    // Availability
    @Prop({ enum: ['available', 'reserved', 'sold'], default: 'available' })
    availabilityStatus: 'available' | 'reserved' | 'sold';

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

export const ItemSchema = SchemaFactory.createForClass(Item);
