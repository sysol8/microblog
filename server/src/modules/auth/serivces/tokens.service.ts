import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

type TRotateParams = {
  userId: string;
  prevJti: string;
  newJti: string;
  newExpiresAt: Date;
};

@Injectable()
export class TokensService {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: { userId: string; jti: string; expiresAt: Date }) {
    const { userId, jti, expiresAt } = params;
    return this.prisma.token.create({
      data: { userId, jti, expiresAt },
      select: { id: true, userId: true, jti: true },
    });
  }

  async findOne(jti: string) {
    const row = await this.prisma.token.findUnique({
      where: { jti },
    });
    if (!row || row.revokedAt || row.expiresAt <= new Date()) return null;
    return row;
  }

  async rotate(params: TRotateParams) {
    const { prevJti, newJti, userId, newExpiresAt } = params;

    const current = await this.prisma.token.findUnique({
      where: { jti: prevJti },
    });
    const invalid =
      !current ||
      current.userId !== userId ||
      current.revokedAt !== null ||
      current.expiresAt <= new Date();

    if (invalid) throw new UnauthorizedException('Invalid refresh token');

    return this.prisma.$transaction(async (tx) => {
      await tx.token.update({
        where: { jti: prevJti },
        data: { revokedAt: new Date() },
      });
      return tx.token.create({
        data: { userId, jti: newJti, expiresAt: newExpiresAt },
        select: {
          id: true,
          userId: true,
          jti: true,
          expiresAt: true,
          revokedAt: true,
          createdAt: true,
        },
      });
    });
  }

  async revokeOne(jti: string) {
    return this.prisma.token.update({
      where: { jti },
      data: { revokedAt: new Date() },
      select: { jti: true, revokedAt: true },
    });
  }

  async revokeAll(userId: string) {
    return this.prisma.token.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async clearInvalidTokens() {
    return this.prisma.token.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { revokedAt: { not: null } }],
      },
    });
  }
}
