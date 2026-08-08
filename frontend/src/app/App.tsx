import { RouterProvider } from 'react-router/dom';
import { router } from '@/app/providers';
import { useAuthStore, userService } from '@/features/account';
import { useEffect, useState } from 'react';

const App = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const removeToken = useAuthStore((state) => state.removeToken);

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { accessToken } = await userService.refresh();

        if (accessToken) setToken(accessToken);
      } catch {
        removeToken();
      } finally {
        setIsInitializing(false);
      }
    };

    void initAuth();
  }, []);

  return isInitializing ? (
    <h2>Инициализация даных</h2>
  ) : (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
