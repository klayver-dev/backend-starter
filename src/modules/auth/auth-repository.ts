import { prisma } from '../../lib/prisma.js';
import type { RegisterData } from './auth-schema.js';

export class AuthRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: RegisterData) {
    return prisma.user.create({
      data,
    });
  }

  async createPasswordResetToken(data: { userId: string; tokenHash: string; expiresAt: Date }) {
    return prisma.passwordResetToken.create({
      data,
    });
  }

  async findPasswordResetToken(tokenHash: string) {
    return prisma.passwordResetToken.findUnique({
      where: {
        tokenHash,
      },
      include: {
        user: true,
      },
    });
  }

  async markPasswordResetTokenAsUsed(id: string) {
    return prisma.passwordResetToken.update({
      where: {
        id,
      },
      data: {
        usedAt: new Date(),
      },
    });
  }

  async updateUserPassword(userId: string, password: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }
}
