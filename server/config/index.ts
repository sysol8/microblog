import { z } from 'zod';
import { validationSchema as s3 } from '../aws/config/s3.env.schema';
import { validationSchema as base } from './base.env.schema';

export const validationSchema = z
  .object({})
  .extend(base.shape)
  .extend(s3.shape);

export type Env = z.infer<typeof validationSchema>;
