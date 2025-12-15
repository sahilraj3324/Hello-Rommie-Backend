import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateItemDto {
    // Location
    @ApiProperty({ example: 'Bangalore', description: 'City where the item is located' })
    @IsString()
    city: string;

    @ApiPropertyOptional({ example: 'Near Indiranagar Metro' })
    @IsOptional()
    @IsString()
    landmark?: string;

    // Item Details
    @ApiProperty({ example: 'Wooden Study Table' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'furniture', description: 'Category like furniture, electronics, etc.' })
    @IsString()
    category: string;

    @ApiPropertyOptional({ example: 12, description: 'Age/usage in months' })
    @IsOptional()
    @IsNumber()
    conditionAgeMonths?: number;

    // Description
    @ApiPropertyOptional({ example: 'Well-maintained study table with 2 drawers' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: ['study', 'table', 'wooden'], type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    // Pricing
    @ApiProperty({ example: 3500, description: 'Price in INR' })
    @IsNumber()
    price: number;

    @ApiPropertyOptional({ example: true, default: false })
    @IsOptional()
    @IsBoolean()
    isNegotiable?: boolean;

    // Availability
    @ApiPropertyOptional({ enum: ['available', 'reserved', 'sold'], default: 'available' })
    @IsOptional()
    @IsEnum(['available', 'reserved', 'sold'])
    availabilityStatus?: 'available' | 'reserved' | 'sold';

    // Media
    @ApiPropertyOptional({ example: 'https://example.com/item-cover.jpg' })
    @IsOptional()
    @IsString()
    coverImageUrl?: string;

    @ApiPropertyOptional({ example: ['https://example.com/item1.jpg'], type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    imageUrls?: string[];

    // Publishing Lifecycle
    @ApiPropertyOptional({ enum: ['draft', 'published', 'unpublished'], default: 'draft' })
    @IsOptional()
    @IsEnum(['draft', 'published', 'unpublished'])
    status?: 'draft' | 'published' | 'unpublished';
}
