import { IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    contactNumber: string;

    @IsString()
    password: string;
}
