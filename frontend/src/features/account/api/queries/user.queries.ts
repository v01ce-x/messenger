import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  type LoginSchema,
  type RegisterSchema,
  useAuthStore,
  userService,
} from '@/features/account';
import { USER_QUERY_KEYS } from '@/features/account/api/queries/user.keys.ts';
import { useNavigate } from 'react-router';
import { useModal } from '@/shared/lib';

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginSchema) => userService.login(data),

    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate('/chat');
    },
  });
};

export const useRegister = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: Omit<RegisterSchema, 'confirmPassword'>) =>
      userService.register(data),

    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate('/chat');
    },
  });
};

export const useLogout = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.logout,

    onSuccess: () => {
      removeToken();
      queryClient.clear();
      navigate('/login');
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

  return useMutation({
    mutationFn: (file: FormData) => userService.updateAvatar(file),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile(),
      });

      closeModal();
    },
  });
};

export const useUpdateCover = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: (file: FormData) => userService.updateCover(file),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile(),
      });

      closeModal();
    },
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: (data: FormData) => userService.editProfile(data),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile(),
      });

      closeModal();
    },
  });
};
