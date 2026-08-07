import { createBrowserRouter } from 'react-router';
import { AuthPage, ChatPage, ProfilePage, RegisterPage } from '@/pages';
import { ProtectedRoute } from '@/app/providers';
import { Routes } from '@/shared/lib';

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
      },
      {
        path: Routes.profile,
        element: <ProfilePage />,
      },
    ],
  },
]);
