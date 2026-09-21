import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import type { FastifyInstance } from 'fastify';

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Backend Starter API',
        description: 'API base para projetos web.',
        version: '1.0.0',
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
  });
}
