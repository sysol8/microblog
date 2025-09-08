import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserLoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const UserLoginResponseSchema = z.object({
  username: z.string(),
});

export type UserLoginRequest = z.infer<typeof UserLoginRequestSchema>;
export type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;

export class UserLoginDto extends createZodDto(UserLoginRequestSchema) {}
