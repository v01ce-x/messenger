import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().min(6, 'Минимальная длина 6 символов'),
  password: z.string().nonempty('Поле обязательно для заполнения'),
  remember: z.boolean(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
