import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { BadRequestError } from './errors/bad-request-error.js';
import { ForbiddenError } from './errors/forbidden-error.js';
import { NotFoundError } from './errors/not-found-error.js';
import { UnauthorizedError } from './errors/unauthorized-error.js';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof BadRequestError) {
      return reply.status(400).send({
        message: error.message,
        data: null,
      });
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({
        message: error.message,
        data: null,
      });
    }

    if (error instanceof ForbiddenError) {
      return reply.status(403).send({
        message: error.message,
        data: null,
      });
    }

    if (error instanceof NotFoundError) {
      return reply.status(404).send({
        message: error.message,
        data: null,
      });
    }

    return reply.status(500).send({
      message: 'Erro interno do servidor.',
      data: null,
    });
  });
}
