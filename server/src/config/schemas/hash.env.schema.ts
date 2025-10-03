import { z } from 'zod';

// схема валидации .env-переменных, связанных с хешированием
export const validationSchema = z.object({
  HASH_PEPPER: z.string().min(16),
  HASH_MEMORY_COST: z.coerce.number().optional(),
  HASH_TIME_COST: z.coerce.number().optional(),
  HASH_PARALLELISM: z.coerce.number().optional(),
  HASH_LENGTH: z.coerce.number().optional(),
});
