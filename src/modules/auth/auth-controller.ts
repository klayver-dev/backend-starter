import type { FastifyReply } from 'fastify';

import { clearAuthCookie, setAuthCookie } from '../../lib/cookie.js';

import type { LoginData, RegisterData, ResetPasswordData } from './auth-schema.js';

import type { AuthService } from './auth-service.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(data: RegisterData, reply: FastifyReply) {
    const user = await this.authService.register(data);

    return reply.send({
      message: 'Cadastro realizado com sucesso!',
      data: {
        user,
      },
    });
  }

  async login(data: LoginData, reply: FastifyReply) {
    const { user, token } = await this.authService.login(data);

    setAuthCookie(reply, token);

    return reply.send({
      message: 'Login realizado com sucesso!',
      data: {
        user,
      },
    });
  }

  async me(id: string, reply: FastifyReply) {
    const user = await this.authService.me(id);

    return reply.send({
      message: 'Usuário encontrado.',
      data: {
        user,
      },
    });
  }

  async logout(reply: FastifyReply) {
    clearAuthCookie(reply);

    return reply.send({
      message: 'Logout realizado com sucesso!',
      data: null,
    });
  }

  async forgotPassword(email: string, reply: FastifyReply) {
    await this.authService.forgotPassword(email);

    return reply.send({
      message: 'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.',
      data: null,
    });
  }

  async resetPassword(data: ResetPasswordData, reply: FastifyReply) {
    await this.authService.resetPassword(data);

    return reply.send({
      message: 'Senha redefinida com sucesso.',
      data: null,
    });
  }
}
