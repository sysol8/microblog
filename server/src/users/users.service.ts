import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { userAuth } from './users.selects';
import UserWhereUniqueInput = Prisma.UserWhereUniqueInput;
import UserWhereInput = Prisma.UserWhereInput;
import UserOrderByWithRelationInput = Prisma.UserOrderByWithRelationInput;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(userWhereUniqueInput: UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: UserWhereUniqueInput;
    where?: UserWhereInput;
    orderBy?: UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // Принимает объект с данными для создания пользователя (имя пользователя и пароль); метод возвращает данные,
  // которые мы определили в селекте (в данном случае id и username).
  async create(data: { username: string; passwordHash: string }) {
    return this.prisma.user.create({
      data,
      ...userAuth,
    });
  }
}
