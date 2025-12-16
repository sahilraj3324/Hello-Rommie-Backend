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
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto, VerifyResetOtpDto, ResetPasswordDto } from './dto/forgot-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login with contact number and password' })
    @ApiResponse({ status: 200, description: 'Login successful, returns JWT token' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Patch('profiles/:id/change-password')
    @ApiOperation({ summary: 'Change profile password' })
    @ApiBody({ schema: { properties: { oldPassword: { type: 'string' }, newPassword: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Password changed successfully' })
    @ApiResponse({ status: 401, description: 'Current password is incorrect' })
    changePassword(
        @Param('id') id: string,
        @Body() body: { oldPassword: string; newPassword: string },
    ) {
        return this.authService.changePassword(id, body.oldPassword, body.newPassword);
    }

    // ==================== FORGOT PASSWORD ENDPOINTS ====================

    @Post('forgot-password')
    @ApiOperation({ summary: 'Request password reset OTP' })
    @ApiResponse({ status: 200, description: 'OTP sent successfully' })
    @ApiResponse({ status: 404, description: 'Profile not found' })
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.requestPasswordReset(forgotPasswordDto.contactNumber);
    }

    @Post('verify-reset-otp')
    @ApiOperation({ summary: 'Verify password reset OTP' })
    @ApiResponse({ status: 200, description: 'OTP verified successfully' })
    @ApiResponse({ status: 401, description: 'Invalid or expired OTP' })
    verifyResetOtp(@Body() verifyResetOtpDto: VerifyResetOtpDto) {
        return this.authService.verifyResetOtp(
            verifyResetOtpDto.contactNumber,
            verifyResetOtpDto.otp,
        );
    }

    @Post('reset-password')
    @ApiOperation({ summary: 'Reset password with OTP' })
    @ApiResponse({ status: 200, description: 'Password reset successfully' })
    @ApiResponse({ status: 401, description: 'Invalid or expired OTP' })
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(
            resetPasswordDto.contactNumber,
            resetPasswordDto.otp,
            resetPasswordDto.newPassword,
        );
    }
}

