import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import {
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from '../../users/dtos/user-register.dto';
import { AuthService } from './auth.service';
import {
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '../../users/dtos/user-login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { type Response, type Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { makeRefreshCookieOptions } from './utils/cookie';
import { TUserAuth } from '../../users/users.selects';
import { ApiBody, ApiResetContentResponse } from '@nestjs/swagger';
import { JwtRefreshAuthGuard } from './guards/refresh-jwt-auth.guard';

// TODO: Поправить типизацию. Сейчас вылезают всякие приколы типа Response & { user: TUserAuth } и т. д., надо это почистить.
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(201)
  async register(
    @Body() dto: UserRegisterRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserRegisterResponseDto> {
    const { user, accessToken, refreshToken } =
      await this.authService.register(dto);
    res.cookie(
      'refreshToken',
      refreshToken,
      makeRefreshCookieOptions(this.configService),
    );
    const { id, username } = user;
    return { accessToken, id, username };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: UserLoginRequestDto })
  @ApiResetContentResponse({ type: UserLoginResponseDto })
  async login(
    @Body() _: UserLoginRequestDto,
    @Req() req: Request & { user: TUserAuth },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    res.cookie(
      'refreshToken',
      refreshToken,
      makeRefreshCookieOptions(this.configService),
    );
    return { accessToken, id: req.user.id, username: req.user.username };
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: Request & { user: { id: string; jti: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refresh(
      req.user,
    );
    res.cookie(
      'refreshToken',
      refreshToken,
      makeRefreshCookieOptions(this.configService),
    );
    return { accessToken };
  }

  @Get('me')
  @HttpCode(200)
  me(@Req() req: Request & { user: TUserAuth }) {
    return req.user;
  }

  // TODO: Добавить роуты для смены пароля и т. д.
}
