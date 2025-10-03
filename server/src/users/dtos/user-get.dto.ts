import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const UserGetOneRequestSchema = z.object({
  id: z.uuid(),
});

const UserGetOneResponseSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  createdAt: z.date(),
  avatarUrl: z.url(),
  posts: z.array(z.object()),
  likes: z.array(z.object()),
  likesCount: z.number(),
});

export type UserGetOneRequest = z.infer<typeof UserGetOneRequestSchema>;
export type UserGetOneResponse = z.infer<typeof UserGetOneResponseSchema>;

const UserGetManyResponseSchema = z.array(UserGetOneResponseSchema);
export type UserGetManyResponse = z.infer<typeof UserGetManyResponseSchema>;

export class UserGetOneDto extends createZodDto(UserGetOneRequestSchema) {}
