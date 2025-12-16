import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class ForgotPasswordDto {
    @ApiProperty({ example: '9876543210', description: 'Registered contact number' })
    @IsString()
    @IsNotEmpty()
    contactNumber: string;
}

export class VerifyResetOtpDto {
    @ApiProperty({ example: '9876543210', description: 'Registered contact number' })
    @IsString()
    @IsNotEmpty()
    contactNumber: string;

    @ApiProperty({ example: '123456', description: '6-digit OTP' })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{6}$/, { message: 'OTP must be a 6-digit number' })
    otp: string;
}

export class ResetPasswordDto {
    @ApiProperty({ example: '9876543210', description: 'Registered contact number' })
    @IsString()
    @IsNotEmpty()
    contactNumber: string;

    @ApiProperty({ example: '123456', description: '6-digit OTP' })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{6}$/, { message: 'OTP must be a 6-digit number' })
    otp: string;

    @ApiProperty({ example: 'newPassword123', description: 'New password (min 6 characters)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}
