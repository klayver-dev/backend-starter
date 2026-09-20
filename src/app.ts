import cookie from '@fastify/cookie';
import Fastify from 'fastify';
import { createAuthModule } from './containers/auth-container.js';
import { createUsersModule } from './containers/users-container.js';
import { ForbiddenError } from './errors/forbidden-error.js';
import { UnauthorizedError } from './errors/unauthorized-error.js';

const app = Fastify();

app.register(cookie);

app.setErrorHandler((error, request, reply) => {
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

const authRoutes = createAuthModule();
const usersRoutes = createUsersModule();

authRoutes.register(app);
usersRoutes.register(app);

/* app.get('/test/make-admin', async (request, reply) => {
  const user = await prisma.user.update({
    where: {
      email: 'klayver7paula@gmail.com',
    },
    data: {
      role: UserRole.ADMIN,
    },
  });

  return reply.send({
    message: 'Usuário promovido para ADMIN.',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}); */

export { app };
