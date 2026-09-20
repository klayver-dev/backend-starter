import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        error: 'Nome deve ter pelo menos 2 caracteres.',
      })
      .optional(),

    email: z
      .email({
        error: 'E-mail inválido.',
      })
      .optional(),
  })
  .refine(data => data.name !== undefined || data.email !== undefined, {
    error: 'Informe pelo menos um campo para atualizar.',
  });

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, {
    error: 'Senha atual é obrigatória.',
  }),

  newPassword: z.string().min(6, {
    error: 'A nova senha deve ter pelo menos 6 caracteres.',
  }),
});

export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;
