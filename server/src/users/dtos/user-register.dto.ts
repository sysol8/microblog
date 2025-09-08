import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserRegisterRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const UserRegisterResponseSchema = z.object({
  username: z.string(),
});

export type UserRegisterRequest = z.infer<typeof UserRegisterRequestSchema>;
export type UserRegisterResponse = z.infer<typeof UserRegisterResponseSchema>;

export class UserRegisterDto extends createZodDto(UserRegisterRequestSchema) {}
