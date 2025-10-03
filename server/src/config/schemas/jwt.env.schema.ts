import { z } from 'zod';

// схема валидации .env-переменных, связанных с JWT
export const validationSchema = z.object({
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.coerce.number().optional(),
});
