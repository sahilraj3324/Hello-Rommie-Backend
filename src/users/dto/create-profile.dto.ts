import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateProfileDto {
    // Personal Info
    @IsString()
    fullName: string;

    @IsNumber()
    age: number;

    @IsEnum(['male', 'female', 'other'])
    gender: 'male' | 'female' | 'other';

    @IsEnum(['individual', 'business'])
    profileType: 'individual' | 'business';

    @IsOptional()
    @IsEnum(['single', 'married', 'divorced'])
    maritalStatus?: 'single' | 'married' | 'divorced';

    @IsOptional()
    @IsString()
    profilePicUrl?: string;

    // About
    @IsOptional()
    @IsString()
    introduction?: string;

    @IsOptional()
    @IsString()
    personality?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];

    // Location
    @IsOptional()
    @IsString()
    hometown?: string;

    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    address?: string;

    // Lifestyle Preferences
    @IsOptional()
    @IsEnum(['veg', 'non-veg', 'both'])
    foodPreference?: 'veg' | 'non-veg' | 'both';

    @IsOptional()
    @IsEnum(['yes', 'no', 'occasionally'])
    drinking?: 'yes' | 'no' | 'occasionally';

    @IsOptional()
    @IsEnum(['yes', 'no'])
    smoking?: 'yes' | 'no';

    @IsOptional()
    @IsEnum(['yes', 'no'])
    pets?: 'yes' | 'no';

    @IsOptional()
    @IsEnum(['self', 'shared', 'maid'])
    roomCleaning?: 'self' | 'shared' | 'maid';

    @IsOptional()
    @IsEnum(['day', 'night', 'flexible'])
    workSchedule?: 'day' | 'night' | 'flexible';

    // Contact
    @IsOptional()
    @IsString()
    contactNumber?: string;

    // Status
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
