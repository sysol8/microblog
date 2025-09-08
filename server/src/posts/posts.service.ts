import { Injectable } from '@nestjs/common';
import { type Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [];
}
