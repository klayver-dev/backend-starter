import cookie from '@fastify/cookie';
import Fastify from 'fastify';
import { createAuthModule } from './containers/auth-container.js';
import { createUsersModule } from './containers/users-container.js';
import { registerErrorHandler } from './error-handler.js';
import { registerSwagger } from './swagger.js';

const app = Fastify();

app.register(cookie);
await registerSwagger(app);
registerErrorHandler(app);

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
