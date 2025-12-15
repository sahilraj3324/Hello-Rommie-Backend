import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, Matches, IsOptional, IsEmail } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: '9876543210', description: '10-digit contact number' })
    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Contact number must be 10 digits' })
    contactNumber: string;

    @ApiPropertyOptional({ example: 'john@example.com', description: 'Email address' })
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    email?: string;

    @ApiProperty({ example: 'password123', description: 'Minimum 6 characters' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}
