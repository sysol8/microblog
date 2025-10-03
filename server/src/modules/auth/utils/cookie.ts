import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

// используем функцию, а не статичный конфиг, чтобы иметь доступ к ConfigService
export const makeRefreshCookieOptions = (
  cfg: ConfigService,
): CookieOptions => ({
  httpOnly: true,
  secure: cfg.get('NODE_ENV') === 'production',
  sameSite: cfg.get('AUTH_SAMESITE') ?? 'lax',
  path: cfg.get('AUTH_PATH') ?? undefined,
  domain: cfg.get('AUTH_DOMAIN') ?? undefined,
  maxAge: cfg.get('AUTH_MAX_AGE') ?? 1000 * 60 * 60 * 24 * 30, // 30d
});
