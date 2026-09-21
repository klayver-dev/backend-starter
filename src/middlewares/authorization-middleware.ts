import type { FastifyRequest } from 'fastify';

import type { AuthorizationService } from '../modules/authorization/authorization-service.js';
import type { UserRole } from '../authorization/roles.js';

export function requireRole(
  authorizationService: AuthorizationService,
  ...allowedRoles: UserRole[]
) {
  return async (request: FastifyRequest) => {
    await authorizationService.checkRole(request.user.id, allowedRoles);
  };
}
