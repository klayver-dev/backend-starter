import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import Fastify from 'fastify';

import { frontendUrl } from './config.js';
import { createAuthModule } from './containers/auth-container.js';
import { createUsersModule } from './containers/users-container.js';
import { registerErrorHandler } from './error-handler.js';
import { registerSwagger } from './swagger.js';

const app = Fastify();

await app.register(cors, {
  origin: frontendUrl,
  credentials: true,
});

await app.register(cookie);

await registerSwagger(app);

registerErrorHandler(app);

const authRoutes = createAuthModule();
const usersRoutes = createUsersModule();

authRoutes.register(app);
usersRoutes.register(app);

export { app };
