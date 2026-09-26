import { RouterProvider } from 'react-router/dom';
import { router } from '@/app/providers';
import { useAuthStore, userService } from '@/features/account';
import { useEffect, useState } from 'react';
import { Notification } from '@/shared/ui';
import { useNotificationStore } from '@/shared/hooks';

const App = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const removeToken = useAuthStore((state) => state.removeToken);
  const messageNotification = useNotificationStore((state) => state.message);
  const notificationId = useNotificationStore((state) => state.timerId);

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

      {messageNotification && <Notification key={notificationId} />}
    </>
  );
};

export default App;
