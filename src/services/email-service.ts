import { Resend } from 'resend';

import { frontendUrl, resendApiKey } from '../config.js';

export class EmailService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(resendApiKey);
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

    const { data, error } = await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Redefinição de senha',
      html: `
        <h1>Redefinição de senha</h1>

        <p>Você solicitou a redefinição da sua senha.</p>

        <p>
          <a href="${resetUrl}">
            Redefinir minha senha
          </a>
        </p>

        <p>Este link expira em 15 minutos.</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
