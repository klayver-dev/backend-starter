import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { ForbiddenError } from './errors/forbidden-error.js';
import { UnauthorizedError } from './errors/unauthorized-error.js';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({
        message: error.message,
      });
    }

    if (error instanceof ForbiddenError) {
      return reply.status(403).send({
        message: error.message,
      });
    }

    return reply.status(500).send({
      message: 'Erro interno do servidor.',
    });
  });
}
