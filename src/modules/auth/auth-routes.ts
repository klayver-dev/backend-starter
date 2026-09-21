import type { FastifyInstance } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import type { AuthController } from './auth-controller.js';

import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from './auth-schema.js';

import {
  forgotPasswordRouteSchema,
  loginRouteSchema,
  logoutRouteSchema,
  meRouteSchema,
  registerRouteSchema,
  resetPasswordRouteSchema,
} from './auth-swagger.js';

export class AuthRoutes {
  constructor(private readonly authController: AuthController) {}

  register(app: FastifyInstance) {
    app.post(
      '/auth/register',
      {
        schema: registerRouteSchema,
      },
      async (request, reply) => {
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

        return this.authController.register(req.data, reply);
      },
    );

    app.post(
      '/auth/login',
      {
        schema: loginRouteSchema,
      },
      async (request, reply) => {
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

        return this.authController.login(req.data, reply);
      },
    );

    app.get(
      '/auth/me',
      {
        preHandler: authMiddleware,
        schema: meRouteSchema,
      },
      async (request, reply) => {
        return this.authController.me(request.user.id, reply);
      },
    );

    app.post(
      '/auth/logout',
      {
        schema: logoutRouteSchema,
      },
      async (request, reply) => {
        return this.authController.logout(reply);
      },
    );

    app.post(
      '/auth/forgot-password',
      {
        schema: forgotPasswordRouteSchema,
      },
      async (request, reply) => {
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
      },
    );

    app.post(
      '/auth/reset-password',
      {
        schema: resetPasswordRouteSchema,
      },
      async (request, reply) => {
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
      },
    );
  }
}
