import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Post } from '@prisma/client';
import PostWhereUniqueInput = Prisma.PostWhereUniqueInput;
import PostWhereInput = Prisma.PostWhereInput;
import PostOrderByWithRelationInput = Prisma.PostOrderByWithRelationInput;
import PostCreateInput = Prisma.PostCreateInput;
import PostUpdateInput = Prisma.PostUpdateInput;

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async post(postWhereUniqueInput: PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: PostWhereUniqueInput;
    where?: PostWhereInput;
    orderBy?: PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
