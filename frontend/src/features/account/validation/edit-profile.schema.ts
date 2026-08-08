import { z } from 'zod';

export const editProfileSchema = z.object({
  firstName: z.string().min(2, 'Имя содержит минимум 2 буквы'),
  lastName: z.string().min(2, 'Фамилия содержит минимум 2 буквы'),
  middleName: z.string(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
