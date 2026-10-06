import { useAuthStore } from '@/features/account';
import { Navigate, Outlet } from 'react-router';
import { Routes } from '@/shared/lib';
import ModalProvider from './ModalProvider';
import { Header } from '@/app/layout';

const ProtectedRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to={Routes.login} replace={true} />;
  }

  return (
    <div className="wrapper">
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <ModalProvider />
    </div>
  );
};

export default ProtectedRoute;
