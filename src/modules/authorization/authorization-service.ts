import { UserRole } from '../../authorization/roles.js';
import { ForbiddenError } from '../../errors/forbidden-error.js';

import type { AuthorizationRepository } from './authorization-repository.js';

export class AuthorizationService {
  constructor(private readonly authorizationRepository: AuthorizationRepository) {}

  async checkRole(userId: string, allowedRoles: UserRole[]) {
    const user = await this.authorizationRepository.findUserRole(userId);

    if (!user) {
      throw new ForbiddenError();
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
      throw new ForbiddenError();
    }
  }
}
