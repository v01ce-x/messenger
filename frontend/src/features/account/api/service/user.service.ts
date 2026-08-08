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

  refresh: () =>
    api.post<ResponseToken>('/user/refresh').then((res) => res.data),

  updateAvatar: (file: FormData) =>
    api
      .post<{ success: boolean }>('/user/avatar', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data),

  updateCover: (file: FormData) =>
    api
      .post<{ success: boolean }>('/user/cover', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data),

  editProfile: (data: FormData) =>
    api
      .patch<{ success: boolean }>('user/profile', data)
      .then((res) => res.data),
};
