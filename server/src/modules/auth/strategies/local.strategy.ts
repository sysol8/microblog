import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { TUserAuth } from '../../../users/users.selects';

// принимает данные с клиента, делегирует проверку в authService
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<TUserAuth> {
    return await this.authService.validateUser(username, password);
  }
}
