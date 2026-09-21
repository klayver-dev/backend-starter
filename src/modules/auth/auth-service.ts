import bcrypt from 'bcrypt';

import { UnauthorizedError } from '../../errors/unauthorized-error.js';
import { generateToken } from '../../lib/jwt.js';

import {
  generatePasswordResetToken,
  hashPasswordResetToken,
} from '../../lib/password-reset-token.js';

import type { EmailService } from '../../services/email-service.js';
import type { AuthRepository } from './auth-repository.js';

import type { LoginData, RegisterData, ResetPasswordData } from './auth-schema.js';

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailService: EmailService,
  ) {}

  async register(data: RegisterData) {
    const existingUser = await this.authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('E-mail já cadastrado!');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.authRepository.createUser({
      name: data.name,
      email: data.email,
      password: passwordHash,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(data: LoginData) {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('E-mail ou senha inválidos!');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) {
      throw new Error('E-mail ou senha inválidos!');
    }

    const token = generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async me(id: string) {
    const user = await this.authRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado!');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      return;
    }

    const token = generatePasswordResetToken();

    const tokenHash = hashPasswordResetToken(token);

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.authRepository.createPasswordResetToken({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    await this.emailService.sendPasswordResetEmail(user.email, token);
  }

  async resetPassword(data: ResetPasswordData) {
    const tokenHash = hashPasswordResetToken(data.token);

    const resetToken = await this.authRepository.findPasswordResetToken(tokenHash);

    if (!resetToken) {
      throw new UnauthorizedError('Token inválido ou expirado.');
    }

    if (resetToken.usedAt) {
      throw new UnauthorizedError('Token inválido ou expirado.');
    }

    if (resetToken.expiresAt <= new Date()) {
      throw new UnauthorizedError('Token inválido ou expirado.');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    await this.authRepository.updateUserPassword(resetToken.userId, passwordHash);

    await this.authRepository.markPasswordResetTokenAsUsed(resetToken.id);
  }
}
