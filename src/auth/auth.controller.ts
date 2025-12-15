import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 409, description: 'User already exists' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login with contact number and password' })
    @ApiResponse({ status: 200, description: 'Login successful, returns JWT token' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('users')
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of all users' })
    findAll() {
        return this.authService.findAll();
    }

    @Get('users/:id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    findOne(@Param('id') id: string) {
        return this.authService.findOne(id);
    }

    @Patch('users/:id/change-password')
    @ApiOperation({ summary: 'Change user password' })
    @ApiBody({ schema: { properties: { oldPassword: { type: 'string' }, newPassword: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Password changed successfully' })
    @ApiResponse({ status: 401, description: 'Current password is incorrect' })
    changePassword(
        @Param('id') id: string,
        @Body() body: { oldPassword: string; newPassword: string },
    ) {
        return this.authService.changePassword(id, body.oldPassword, body.newPassword);
    }

    @Patch('users/:id/deactivate')
    @ApiOperation({ summary: 'Deactivate user account' })
    @ApiResponse({ status: 200, description: 'User deactivated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    deactivate(@Param('id') id: string) {
        return this.authService.deactivate(id);
    }

    @Delete('users/:id')
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    delete(@Param('id') id: string) {
        return this.authService.delete(id);
    }
}
