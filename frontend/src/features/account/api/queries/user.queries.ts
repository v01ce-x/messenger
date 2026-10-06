import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  type LoginSchema,
  type RegisterSchema,
  useAuthStore,
  userService,
  useSearchStore,
} from '@/features/account';
import { USER_QUERY_KEYS } from '@/features/account/api/queries/user.keys.ts';
import { useNavigate } from 'react-router';
import { useModal } from '@/shared/lib';
import { useNotificationStore, useSocketStore } from '@/shared/store';
import type { AxiosError } from 'axios';
import { useDebounce } from '@/shared/hooks';

interface Error {
  message: string;
  statusCode: number;
  error: string;
}

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  return useMutation({
    mutationFn: (data: LoginSchema) => userService.login(data),

    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate('/chat');
      showNotification('Вы успешно вошли в аккаунт', 'success');
    },

    onError: () => {
      showNotification('Ошибка авторизации', 'error');
    },
  });
};

export const useRegister = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  return useMutation({
    mutationFn: (data: Omit<RegisterSchema, 'confirmPassword'>) =>
      userService.register(data),

    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate('/chat');
      showNotification('Вы успешно зарегистрировались', 'success');
    },

    onError: (error: AxiosError<Error>) => {
      showNotification(
        error.response?.data.message ?? 'Ошибка регистрации',
        'error',
      );
    },
  });
};

export const useLogout = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );
  const setConnectedSocket = useSocketStore((state) => state.setConnected);

  return useMutation({
    mutationFn: userService.logout,

    onSuccess: () => {
      removeToken();
      queryClient.clear();
      navigate('/login');
      showNotification('Вы успешно вышли из аккаунта', 'success');
      setConnectedSocket(false);
    },
  });
};

export const useProfile = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: userService.profile,
    enabled: isAuth,
    staleTime: Infinity,
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  return useMutation({
    mutationFn: (file: FormData) => userService.updateAvatar(file),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile(),
      });

      closeModal();
      showNotification('Аватарка успешно изменена', 'success');
    },

    onError: () => {
      showNotification('Возникла неизвестная ошибка', 'error');
    },
  });
};

export const useUpdateCover = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  return useMutation({
    mutationFn: (file: FormData) => userService.updateCover(file),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile(),
      });

      closeModal();
      showNotification('Обои успешно изменины', 'success');
    },
    onError: () => {
      showNotification('Возникла неизвестная ошибка', 'error');
    },
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  return useMutation({
    mutationFn: (data: FormData) => userService.editProfile(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile(),
      });

      closeModal();
      showNotification('Данные профиля изменены', 'success');
    },
  });
};

export const useSearchUsers = () => {
  const value = useSearchStore((state) => state.searchValue);
  const searchValue = useDebounce(value);

  return useQuery({
    queryFn: () => userService.searchUsers({ searchValue }),
    queryKey: USER_QUERY_KEYS.search(searchValue),
    enabled: Boolean(searchValue) || searchValue?.length !== 0,
  });
};
