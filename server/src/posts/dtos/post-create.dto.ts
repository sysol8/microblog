import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const PostCreateRequestSchema = z.object({});

const PostCreateResponseSchema = z.object({});

export type PostCreateRequest = z.infer<typeof PostCreateRequestSchema>;
export type PostCreateResponse = z.infer<typeof PostCreateResponseSchema>;

export class PostCreateDto extends createZodDto(PostCreateRequestSchema) {}