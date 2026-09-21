import { prisma } from '../../lib/prisma.js';

export class AuthorizationRepository {
  async findUserRole(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });
  }
}
