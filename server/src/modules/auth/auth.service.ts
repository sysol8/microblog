import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './serivces/password.service';
import {
  UserRegisterRequest,
  UserRegisterRequestDto,
} from '../../users/dtos/user-register.dto';
import type { TUserAuth } from '../../users/users.selects';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { TokensService } from './serivces/tokens.service';

// достает юзера из соответствующего сервиса, проверяет пароль в passwordService, возвращает безопасный пейлоад без хеша пароля
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokensService: TokensService,
  ) {}

  async validateUser(username: string, pass: string): Promise<TUserAuth> {
    const user = await this.usersService.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ok = await this.passwordService.verify(user.passwordHash, pass);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  login(user: TUserAuth) {
    const payload = { id: user.id, username: user.username };
    return this.issueTokens(payload);
  }

  async refresh(payload: { id: string; jti: string }) {
    const { id: userId, jti: prevJti } = payload;

    const row = await this.tokensService.findOne(prevJti);
    if (!row || row.userId !== userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newJti = randomUUID();
    const newExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await this.tokensService.rotate({
      prevJti,
      userId,
      newJti,
      newExpiresAt,
    });

    const user = await this.usersService.findOne({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    return this.signTokens({ id: user.id, username: user.username }, newJti);
  }

  // генерируем токены
  async issueTokens(payload: TUserAuth) {
    const jti = randomUUID();
    const refreshExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await this.tokensService.create({
      userId: payload.id,
      jti,
      expiresAt: refreshExpiresAt,
    });

    return this.signTokens(payload, jti);
  }

  private signTokens(user: TUserAuth, jti: string) {
    const accessToken = this.jwtService.sign(
      { id: user.id, username: user.username },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );
    const refreshToken = this.jwtService.sign(
      { id: user.id, jti },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '30d',
      },
    );
    return { accessToken, refreshToken };
  }

  async register(dto: UserRegisterRequestDto) {
    const isUserExists = !!(await this.usersService.findOne({
      username: dto.username,
    }));
    if (isUserExists) {
      throw new ConflictException('Username already taken');
    }
    const passwordHash = await this.passwordService.hash(dto.password);

    const user = await this.usersService.create({
      username: dto.username,
      passwordHash: passwordHash,
    });

    const { accessToken, refreshToken } = await this.issueTokens(user);

    return { user, accessToken, refreshToken };
  }
}
