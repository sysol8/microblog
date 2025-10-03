import { z } from 'zod';
import { validationSchema as s3 } from './schemas/s3.env.schema';
import { validationSchema as base } from './schemas/base.env.schema';
import { validationSchema as auth } from './schemas/hash.env.schema';
import { validationSchema as jwt } from './schemas/jwt.env.schema';

// расширяем базовую схему дополнительными
export const validationSchema = z
  .object({})
  .extend(base.shape)
  .extend(s3.shape)
  .extend(auth.shape)
  .extend(jwt.shape);

export type Env = z.infer<typeof validationSchema>;
