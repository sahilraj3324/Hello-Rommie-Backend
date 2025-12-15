import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateProfileDto {
    // Personal Info
    @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
    @IsString()
    fullName: string;

    @ApiProperty({ example: 25, description: 'Age of the user' })
    @IsNumber()
    age: number;

    @ApiProperty({ enum: ['male', 'female', 'other'], example: 'male' })
    @IsEnum(['male', 'female', 'other'])
    gender: 'male' | 'female' | 'other';

    @ApiProperty({ enum: ['individual', 'business'], example: 'individual' })
    @IsEnum(['individual', 'business'])
    profileType: 'individual' | 'business';

    @ApiPropertyOptional({ enum: ['single', 'married', 'divorced'], example: 'single' })
    @IsOptional()
    @IsEnum(['single', 'married', 'divorced'])
    maritalStatus?: 'single' | 'married' | 'divorced';

    @ApiPropertyOptional({ example: 'https://example.com/photo.jpg' })
    @IsOptional()
    @IsString()
    profilePicUrl?: string;

    // About
    @ApiPropertyOptional({ example: 'Software developer looking for a roommate' })
    @IsOptional()
    @IsString()
    introduction?: string;

    @ApiPropertyOptional({ example: 'Friendly and organized' })
    @IsOptional()
    @IsString()
    personality?: string;

    @ApiPropertyOptional({ example: ['reading', 'gaming', 'cooking'], type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];

    // Location
    @ApiPropertyOptional({ example: 'Mumbai' })
    @IsOptional()
    @IsString()
    hometown?: string;

    @ApiProperty({ example: 'Bangalore', description: 'Current city' })
    @IsString()
    city: string;

    @ApiPropertyOptional({ example: '123 Main Street, Koramangala' })
    @IsOptional()
    @IsString()
    address?: string;

    // Lifestyle Preferences
    @ApiPropertyOptional({ enum: ['veg', 'non-veg', 'both'], example: 'both' })
    @IsOptional()
    @IsEnum(['veg', 'non-veg', 'both'])
    foodPreference?: 'veg' | 'non-veg' | 'both';

    @ApiPropertyOptional({ enum: ['yes', 'no', 'occasionally'], example: 'occasionally' })
    @IsOptional()
    @IsEnum(['yes', 'no', 'occasionally'])
    drinking?: 'yes' | 'no' | 'occasionally';

    @ApiPropertyOptional({ enum: ['yes', 'no'], example: 'no' })
    @IsOptional()
    @IsEnum(['yes', 'no'])
    smoking?: 'yes' | 'no';

    @ApiPropertyOptional({ enum: ['yes', 'no'], example: 'no' })
    @IsOptional()
    @IsEnum(['yes', 'no'])
    pets?: 'yes' | 'no';

    @ApiPropertyOptional({ enum: ['self', 'shared', 'maid'], example: 'self' })
    @IsOptional()
    @IsEnum(['self', 'shared', 'maid'])
    roomCleaning?: 'self' | 'shared' | 'maid';

    @ApiPropertyOptional({ enum: ['day', 'night', 'flexible'], example: 'day' })
    @IsOptional()
    @IsEnum(['day', 'night', 'flexible'])
    workSchedule?: 'day' | 'night' | 'flexible';

    // Contact
    @ApiPropertyOptional({ example: '9876543210' })
    @IsOptional()
    @IsString()
    contactNumber?: string;

    // Status
    @ApiPropertyOptional({ example: true, default: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
