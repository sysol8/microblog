import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req.cookies?.refreshToken;
          return typeof token === 'string' ? token : null;
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
    });
  }

  validate(payload: { id: string; jti: string }) {
    return payload;
  }
}
