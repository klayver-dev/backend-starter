import type { FastifyReply } from 'fastify';

import type { UpdatePasswordData, UpdateProfileData } from './users-schema.js';

import type { UsersService } from './users-service.js';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async getProfile(userId: string, reply: FastifyReply) {
    const user = await this.usersService.getProfile(userId);

    return reply.send({
      message: 'Usuário encontrado.',
      data: {
        user,
      },
    });
  }

  async updateProfile(userId: string, data: UpdateProfileData, reply: FastifyReply) {
    const user = await this.usersService.updateProfile(userId, data);

    return reply.send({
      message: 'Perfil atualizado com sucesso.',
      data: {
        user,
      },
    });
  }

  async updatePassword(userId: string, data: UpdatePasswordData, reply: FastifyReply) {
    await this.usersService.updatePassword(userId, data);

    return reply.send({
      message: 'Senha alterada com sucesso.',
      data: null,
    });
  }
}
