import type { FastifyReply } from 'fastify';

export function setAuthCookie(reply: FastifyReply, token: string) {
  reply.setCookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

export function clearAuthCookie(reply: FastifyReply) {
  reply.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}
