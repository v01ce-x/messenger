import { create } from 'zustand';
import { getUserIdFromToken } from '@/shared/utils';

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  isAuth: boolean;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const initialToken = localStorage.getItem('accessToken') || null;

  return {
    accessToken: initialToken,
    userId: initialToken ? getUserIdFromToken(initialToken) : null,

    isAuth: initialToken !== null,

    setToken: (newToken: string) => {
      localStorage.setItem('accessToken', newToken);

      set({
        accessToken: newToken,
        userId: getUserIdFromToken(newToken),
        isAuth: true,
      });
    },

    removeToken: () => {
      localStorage.removeItem('accessToken');

      set({
        accessToken: null,
        userId: null,
        isAuth: false,
      });
    },
  };
});
