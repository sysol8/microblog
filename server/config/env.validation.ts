import { validationSchema } from './index';
import { z } from 'zod';

export function validate(config: Record<string, unknown>) {
  try {
    return validationSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join('; ');
      throw new Error(`Invalid environment variables: ${issues}`);
    }
    throw error;
  }
}
