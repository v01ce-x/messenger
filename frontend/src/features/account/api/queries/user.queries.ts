import { useMutation } from '@tanstack/react-query';
import {
  type LoginSchema,
  type RegisterSchema,
  useAuthStore,
  userService,
} from '@/features/account';

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
