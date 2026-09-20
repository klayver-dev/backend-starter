import { prisma } from '../../lib/prisma.js';

export class UsersRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      email?: string;
    },
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async updatePassword(id: string, password: string) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}
