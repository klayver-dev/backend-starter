import bcrypt from 'bcrypt';

import { BadRequestError } from '../../errors/bad-request-error.js';
import { NotFoundError } from '../../errors/not-found-error.js';

import type { UpdatePasswordData, UpdateProfileData } from './users-schema.js';

import type { UsersRepository } from './users-repository.js';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getProfile(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateProfile(userId: string, data: UpdateProfileData) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    if (data.email !== undefined && data.email !== user.email) {
      const emailAlreadyExists = await this.usersRepository.findByEmail(data.email);

      if (emailAlreadyExists) {
        throw new BadRequestError('E-mail já cadastrado.');
      }
    }

    const updatedUser = await this.usersRepository.update(userId, data);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }

  async updatePassword(userId: string, data: UpdatePasswordData) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    const passwordMatches = await bcrypt.compare(data.currentPassword, user.password);

    if (!passwordMatches) {
      throw new BadRequestError('Senha atual inválida.');
    }

    const passwordHash = await bcrypt.hash(data.newPassword, 10);

    await this.usersRepository.updatePassword(userId, passwordHash);
  }
}
