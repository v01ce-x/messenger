import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z.string().min(2, 'Имя содержит минимум 2 буквы'),
    lastName: z.string().min(2, 'Фамилия содержит минимум 2 буквы'),
    login: z.string().min(6, 'Минимальная длина 6 символов'),
    password: z.string().min(8, 'Минимальная длина 8 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
