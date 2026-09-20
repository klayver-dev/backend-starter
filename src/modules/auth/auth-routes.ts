import type { FastifyInstance } from 'fastify';
import { authMiddleware } from '../../middlewares/auth-middleware.js';
import type { AuthController } from './auth-controller.js';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from './auth-schema.js';

export class AuthRoutes {
  constructor(private readonly authController: AuthController) {}

  register(app: FastifyInstance) {
    app.post('/auth/register', async (request, reply) => {
      const req = registerSchema.safeParse(request.body);

      if (!req.success) {
        const errors = req.error.issues.map(issue => ({
          field: issue.path[0],
          message: issue.message,
        }));

        return reply.status(400).send({
          message: 'Dados inválidos!',
          errors,
        });
      }

      const data = req.data;

      return this.authController.register(data, reply);
    });

    app.post('/auth/login', async (request, reply) => {
      const req = loginSchema.safeParse(request.body);

      if (!req.success) {
        const errors = req.error.issues.map(issue => ({
          field: issue.path[0],
          message: issue.message,
        }));

        return reply.status(400).send({
          message: 'Dados inválidos!',
          errors,
        });
      }

      const data = req.data;

      return this.authController.login(data, reply);
    });

    app.get('/auth/me', { preHandler: authMiddleware }, async (request, reply) => {
      return this.authController.me(request.user.id, reply);
    });

    app.post('/auth/logout', async (request, reply) => {
      return this.authController.logout(reply);
    });

    app.post('/auth/forgot-password', async (request, reply) => {
      const req = forgotPasswordSchema.safeParse(request.body);

      if (!req.success) {
        const errors = req.error.issues.map(issue => ({
          field: issue.path[0],
          message: issue.message,
        }));

        return reply.status(400).send({
          message: 'Dados inválidos!',
          errors,
        });
      }

      return this.authController.forgotPassword(req.data.email, reply);
    });

    app.post('/auth/reset-password', async (request, reply) => {
      const req = resetPasswordSchema.safeParse(request.body);

      if (!req.success) {
        const errors = req.error.issues.map(issue => ({
          field: issue.path[0],
          message: issue.message,
        }));

        return reply.status(400).send({
          message: 'Dados inválidos!',
          errors,
        });
      }

      return this.authController.resetPassword(req.data, reply);
    });
  }
}
