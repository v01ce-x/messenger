import { api } from '@/shared/api';
import type {
  LoginSchema,
  RegisterSchema,
  ResponseToken,
  UserProfile,
} from '@/features/account';

export const userService = {
  login: (data: LoginSchema) =>
    api.post<ResponseToken>('/user/login', data).then((res) => res.data),

  register: (data: Omit<RegisterSchema, 'confirmPassword'>) =>
    api.post<ResponseToken>('/user/register', data).then((res) => res.data),

  profile: () => api.get<UserProfile>('/user/profile').then((res) => res.data),
};
