import { IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Contact number must be 10 digits' })
    contactNumber: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}
