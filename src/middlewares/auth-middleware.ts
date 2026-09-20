import type { FastifyRequest } from 'fastify';

import { UnauthorizedError } from '../errors/unauthorized-error.js';
import { verifyToken } from '../lib/jwt.js';

export async function authMiddleware(request: FastifyRequest) {
  const token = request.cookies.token;

  if (!token) {
    throw new UnauthorizedError();
  }

  const { userId } = verifyToken(token);

  request.user = {
    id: userId,
  };
}
