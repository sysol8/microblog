import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const PostUpdateRequestSchema = z.object({});

const PostUpdateResponseSchema = z.object({});

export type PostUpdateRequest = z.infer<typeof PostUpdateRequestSchema>;
export type PostUpdateResponse = z.infer<typeof PostUpdateResponseSchema>;

export class PostUpdateDto extends createZodDto(PostUpdateRequestSchema) {}
