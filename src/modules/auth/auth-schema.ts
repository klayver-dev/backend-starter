import z from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ error: 'Nome é obrigatório!' })
    .min(3, { error: 'Nome deve ter pelo menos 3 caracteres!' }),
  email: z.email({ error: 'E-mail inválido!' }),
  password: z
    .string({ error: 'Senha é obrigatória!' })
    .min(6, { error: 'A senha deve ter pelo menos 6 caracteres!' }),
});

export type RegisterData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email({ error: 'E-mail inválido!' }),
  password: z
    .string({ error: 'Senha é obrigatória!' })
    .min(6, { error: 'A senha deve ter pelo menos 6 caracteres!' }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email({
    error: 'E-mail inválido.',
  }),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, {
    error: 'Token é obrigatório.',
  }),
  password: z.string().min(6, {
    error: 'A senha deve ter pelo menos 6 caracteres.',
  }),
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
