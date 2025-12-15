import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: '9876543210', description: '10-digit contact number' })
    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Contact number must be 10 digits' })
    contactNumber: string;

    @ApiProperty({ example: 'password123', description: 'Minimum 6 characters' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}
