import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  isAuth: boolean;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const initialToken = localStorage.getItem('accessToken') || null;

  return {
    accessToken: initialToken,

    isAuth: initialToken !== null,

    setToken: (newToken: string) => {
      localStorage.setItem('accessToken', newToken);

      set({
        accessToken: newToken,
        isAuth: true,
      });
    },

    removeToken: () => {
      localStorage.removeItem('accessToken');

      set({
        accessToken: null,
        isAuth: false,
      });
    },
  };
});
