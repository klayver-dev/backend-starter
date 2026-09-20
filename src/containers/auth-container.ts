import { AuthController } from '../modules/auth/auth-controller.js';
import { AuthRepository } from '../modules/auth/auth-repository.js';
import { AuthRoutes } from '../modules/auth/auth-routes.js';
import { AuthService } from '../modules/auth/auth-service.js';
import { EmailService } from '../services/email-service.js';

export function createAuthModule() {
  const emailService = new EmailService();
  const authRepository = new AuthRepository();
  const authService = new AuthService(authRepository, emailService);
  const authController = new AuthController(authService);
  const authRoutes = new AuthRoutes(authController);

  return authRoutes;
}
