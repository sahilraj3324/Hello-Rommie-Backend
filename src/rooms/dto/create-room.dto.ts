import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateRoomDto {
    // Location
    @ApiProperty({ example: 'Bangalore', description: 'City where the room is located' })
    @IsString()
    city: string;

    @ApiPropertyOptional({ example: 'Near Koramangala Metro' })
    @IsOptional()
    @IsString()
    landmark?: string;

    // Room Details
    @ApiProperty({ enum: ['private', 'shared', 'entire'], example: 'private' })
    @IsEnum(['private', 'shared', 'entire'])
    roomType: 'private' | 'shared' | 'entire';

    @ApiPropertyOptional({ example: 250, description: 'Room size in sq ft' })
    @IsOptional()
    @IsNumber()
    sizeSqFt?: number;

    @ApiPropertyOptional({ example: true, default: false })
    @IsOptional()
    @IsBoolean()
    parking?: boolean;

    // Description
    @ApiProperty({ example: 'Spacious room in 2BHK apartment' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'Fully furnished room with attached bathroom' })
    @IsOptional()
    @IsString()
    description?: string;

    // Amenities
    @ApiPropertyOptional({ example: ['wifi', 'ac', 'geyser'], type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    amenities?: string[];

    // Pricing
    @ApiProperty({ example: 15000, description: 'Monthly rent amount' })
    @IsNumber()
    rentAmount: number;

    @ApiPropertyOptional({ example: 30000, description: 'Security deposit' })
    @IsOptional()
    @IsNumber()
    securityDeposit?: number;

    // Media
    @ApiPropertyOptional({ example: 'https://example.com/room-cover.jpg' })
    @IsOptional()
    @IsString()
    coverImageUrl?: string;

    @ApiPropertyOptional({ example: ['https://example.com/room1.jpg', 'https://example.com/room2.jpg'], type: [String] })
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
