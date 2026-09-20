import type { FastifyInstance } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import { updatePasswordSchema, updateProfileSchema } from './users-schema.js';

import { UserRole } from '../../authorization/roles.js';
import { requireRole } from '../../middlewares/authorization-middleware.js';
import type { UsersController } from './users-controller.js';

export class UsersRoutes {
  constructor(private readonly usersController: UsersController) {}

  register(app: FastifyInstance) {
    app.get(
      '/users/me',
      {
        preHandler: authMiddleware,
      },
      async (request, reply) => {
        return this.usersController.getProfile(request.user.id, reply);
      },
    );

    app.patch(
      '/users/me',
      {
        preHandler: authMiddleware,
      },
      async (request, reply) => {
        const req = updateProfileSchema.safeParse(request.body);

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

        return this.usersController.updateProfile(request.user.id, req.data, reply);
      },
    );

    app.patch(
      '/users/me/password',
      {
        preHandler: authMiddleware,
      },
      async (request, reply) => {
        const req = updatePasswordSchema.safeParse(request.body);

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

        return this.usersController.updatePassword(request.user.id, req.data, reply);
      },
    );

    app.get(
      '/admin/test',
      {
        preHandler: [authMiddleware, requireRole(UserRole.ADMIN)],
      },
      async (request, reply) => {
        return reply.send({
          message: 'Você é administrador.',
        });
      },
    );
  }
}
