import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserLoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const UserLoginResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  accessToken: z.jwt(),
});

export type UserLoginRequest = z.infer<typeof UserLoginRequestSchema>;
export type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;

export class UserLoginRequestDto extends createZodDto(UserLoginRequestSchema) {}
export class UserLoginResponseDto extends createZodDto(
  UserLoginResponseSchema,
) {}
