import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: '9876543210', description: 'Registered contact number' })
    @IsString()
    contactNumber: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsString()
    password: string;
}
