import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const PostLikeRequestSchema = z.object({});

const PostLikeResponseSchema = z.object({});

export type PostLikeRequest = z.infer<typeof PostLikeRequestSchema>;
export type PostLikeResponse = z.infer<typeof PostLikeResponseSchema>;

export class PostLikeDto extends createZodDto(PostLikeRequestSchema) {}
