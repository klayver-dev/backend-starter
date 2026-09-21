import type { FastifyInstance } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import { updatePasswordSchema, updateProfileSchema } from './users-schema.js';

import {
  getProfileRouteSchema,
  updatePasswordRouteSchema,
  updateProfileRouteSchema,
} from './users-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';
import type { UsersController } from './users-controller.js';

export class UsersRoutes {
  constructor(
    private readonly usersController: UsersController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.get(
      '/users/me',
      {
        preHandler: authMiddleware,
        schema: getProfileRouteSchema,
      },
      async (request, reply) => {
        return this.usersController.getProfile(request.user.id, reply);
      },
    );

    app.patch(
      '/users/me',
      {
        preHandler: authMiddleware,
        schema: updateProfileRouteSchema,
      },
      async (request, reply) => {
        const req = updateProfileSchema.safeParse(request.body);

        if (!req.success) {
          const errors = req.error.issues.map(issue => ({
            field: issue.path[0],
            message: issue.message,
          }));

          return reply.status(400).send({
            message: 'Dados inválidos.',
            errors,
            data: null,
          });
        }

        return this.usersController.updateProfile(request.user.id, req.data, reply);
      },
    );

    app.patch(
      '/users/me/password',
      {
        preHandler: authMiddleware,
        schema: updatePasswordRouteSchema,
      },
      async (request, reply) => {
        const req = updatePasswordSchema.safeParse(request.body);

        if (!req.success) {
          const errors = req.error.issues.map(issue => ({
            field: issue.path[0],
            message: issue.message,
          }));

          return reply.status(400).send({
            message: 'Dados inválidos.',
            errors,
            data: null,
          });
        }

        return this.usersController.updatePassword(request.user.id, req.data, reply);
      },
    );
  }
}
