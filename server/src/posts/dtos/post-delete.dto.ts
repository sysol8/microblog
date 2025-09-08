import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const PostDeleteRequestSchema = z.object({});

const PostDeleteResponseSchema = z.object({});

export type PostDeleteRequest = z.infer<typeof PostDeleteRequestSchema>;
export type PostDeleteResponse = z.infer<typeof PostDeleteResponseSchema>;

export class PostDeleteDto extends createZodDto(PostDeleteRequestSchema) {}
