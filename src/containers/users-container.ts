import { UsersController } from '../modules/users/users-controller.js';
import { UsersRepository } from '../modules/users/users-repository.js';
import { UsersRoutes } from '../modules/users/users-routes.js';
import { UsersService } from '../modules/users/users-service.js';

export function createUsersModule() {
  const usersRepository = new UsersRepository();
  const usersService = new UsersService(usersRepository);
  const usersController = new UsersController(usersService);
  const usersRoutes = new UsersRoutes(usersController);

  return usersRoutes;
}
