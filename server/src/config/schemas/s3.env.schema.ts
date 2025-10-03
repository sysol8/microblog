import { z } from 'zod';

// схема валидации .env-переменных, связанных с S3-совместимым хранилищем
export const validationSchema = z.object({
  S3_ENDPOINT_URL: z.url(),
  S3_BUCKET_NAME: z.string().min(3),
  S3_ACCESS_KEY_ID: z.string().min(3),
  S3_SECRET_ACCESS_KEY: z.string().min(3),
  S3_DEFAULT_REGION: z.string().min(2),
});
