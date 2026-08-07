import { useMutation, useQuery } from '@tanstack/react-query';
import {
  type LoginSchema,
  type RegisterSchema,
  useAuthStore,
  userService,
} from '@/features/account';
import { USER_QUERY_KEYS } from '@/features/account/api/queries/user.keys.ts';

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (data: LoginSchema) => userService.login(data),

    onSuccess: (data) => {
      setToken(data.accessToken);
    },

    onError: (error) => {
      console.log(error);
      console.log('ну что-то не то');
    },
  });
};

export const useRegister = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (data: Omit<RegisterSchema, 'confirmPassword'>) =>
      userService.register(data),

    onSuccess: (data) => {
      setToken(data.accessToken);
    },

    onError: (error) => {
      console.log(error);
      console.log('не зарегался');
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
