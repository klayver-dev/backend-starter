import type { FastifyRequest } from 'fastify';

import type { UserRole } from '../authorization/roles.js';
import { ForbiddenError } from '../errors/forbidden-error.js';
import { prisma } from '../lib/prisma.js';

export function requireRole(...allowedRoles: UserRole[]) {
  return async (request: FastifyRequest) => {
    const user = await prisma.user.findUnique({
      where: {
        id: request.user.id,
      },
      select: {
        role: true,
      },
    });

    if (!user) {
      throw new ForbiddenError();
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
      throw new ForbiddenError();
    }
  };
}
