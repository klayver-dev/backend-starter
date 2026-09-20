export class UnauthorizedError extends Error {
  constructor(message = 'Não autenticado.') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
