import { createBrowserRouter } from 'react-router';
import { AuthPage, ChatPage, ProfilePage, RegisterPage } from '@/pages';
import { ProtectedRoute } from '@/app/providers';
import { Routes } from '@/shared/lib';
import { ChatWindow } from '@/features/chat/components';

export const router = createBrowserRouter([
  {
    path: Routes.login,
    element: <AuthPage />,
  },
  {
    path: Routes.register,
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: Routes.chat,
        element: <ChatPage />,
        children: [
          {
            path: ':id',
            element: <ChatWindow />
          }
        ]
      },
      {
        path: Routes.profile,
        element: <ProfilePage />,
      },
    ],
  },
]);
