import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import type { Options as Argon2Options } from 'argon2';

// Сервис для работы с паролями: хеширование, верификация, повторное хеширование(?)
@Injectable()
export class PasswordService {
  private readonly pepper: string;
  private readonly options: Argon2Options;

  constructor(private readonly configService: ConfigService) {
    this.pepper = this.configService.get('HASH_PEPPER') ?? '';

    this.options = {
      type: argon2.argon2id,
      memoryCost: this.configService.get('HASH_MEMORY_COST') ?? 2 ** 16,
      timeCost: this.configService.get('HASH_TIME_COST') ?? 3,
      parallelism: this.configService.get('HASH_PARALLELISM') ?? 1,
      hashLength: this.configService.get('HASH_LENGTH') ?? 32,
    };
  }

  hash(plain: string) {
    return argon2.hash(plain + this.pepper, this.options);
  }

  verify(hash: string, plain: string) {
    return argon2.verify(hash, plain + this.pepper);
  }
}
