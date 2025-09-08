import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const UserUpdateRequestSchema = z.object({
  id: z.string(),
  avatar: z.file(),
});

const UserUpdateResponseSchema = z.object({
  avatarUrl: z.string(),
});

export type UserUpdateRequest = z.infer<typeof UserUpdateRequestSchema>;
export type UserUpdateResponse = z.infer<typeof UserUpdateResponseSchema>;

export class UserUpdateDto extends createZodDto(UserUpdateRequestSchema) {}
