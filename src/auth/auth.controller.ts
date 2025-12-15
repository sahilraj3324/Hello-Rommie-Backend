import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('users')
    findAll() {
        return this.authService.findAll();
    }

    @Get('users/:id')
    findOne(@Param('id') id: string) {
        return this.authService.findOne(id);
    }

    @Patch('users/:id/change-password')
    changePassword(
        @Param('id') id: string,
        @Body() body: { oldPassword: string; newPassword: string },
    ) {
        return this.authService.changePassword(id, body.oldPassword, body.newPassword);
    }

    @Patch('users/:id/deactivate')
    deactivate(@Param('id') id: string) {
        return this.authService.deactivate(id);
    }

    @Delete('users/:id')
    delete(@Param('id') id: string) {
        return this.authService.delete(id);
    }
}
