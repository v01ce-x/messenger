import { RouterProvider } from 'react-router/dom';
import { router } from '@/app/providers';
import { useAuthStore, userService } from '@/features/account';
import { useEffect, useState } from 'react';
import { Notification } from '@/shared/ui';
import { useNotificationStore, useSocketStore } from '@/shared/store';
import { connectSocket } from '@/shared/websocket';

const App = () => {
  const token = useAuthStore((state) => state.accessToken);
  const setToken = useAuthStore((state) => state.setToken);
  const removeToken = useAuthStore((state) => state.removeToken);

  const messageNotification = useNotificationStore((state) => state.message);
  const notificationId = useNotificationStore((state) => state.timerId);

  const setConnectedSocket = useSocketStore((state) => state.setConnected);

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

  useEffect(() => {
    if (isInitializing || !token) return;

    const socket = connectSocket(token);

    socket.on('connect', () => {
      setConnectedSocket(true);
      console.log('Connected');
    });
    socket.on('disconnect', () => {
      setConnectedSocket(false);
      console.log('Disconnected');
    });
    socket.on('connect_error', (error) => {
      console.log(error.message);
    });

    return () => {
      socket?.disconnect();
    };
  }, [token, isInitializing]);

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
