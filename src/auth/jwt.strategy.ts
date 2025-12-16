import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from '../users/schemas/profile.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        });
    }

    async validate(payload: { sub: string; contactNumber: string }) {
        const profile = await this.profileModel.findById(payload.sub).select('-password -resetOtp -resetOtpExpiry');
        if (!profile || !profile.isActive) {
            throw new UnauthorizedException();
        }
        return profile;
    }
}

