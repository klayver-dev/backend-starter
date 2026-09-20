import jwt from 'jsonwebtoken';

import { jwtSecret } from '../config.js';
import { UnauthorizedError } from '../errors/unauthorized-error.js';

export function generateToken(userId: string) {
  return jwt.sign(
    {
      sub: userId,
    },
    jwtSecret,
    {
      expiresIn: '1d',
    },
  );
}

export function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, jwtSecret);

    if (typeof payload === 'string' || !payload.sub) {
      throw new UnauthorizedError('Token inválido.');
    }

    return {
      userId: payload.sub,
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }

    throw new UnauthorizedError('Token inválido.');
  }
}
