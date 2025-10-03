import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  validate: validate,
  envFilePath: './.env',
});
