import { useAuthStore } from '@/features/account';
import { Navigate, Outlet } from 'react-router';
import { FieldInput, Header } from '@/shared/ui';
import { SearchIcon } from '@/assets/icons';

export const ProtectedRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header>
        <span>Nexo</span>

        <FieldInput placeholder="Поиск людей и групп" className="field__search">
          <SearchIcon className="icon--18" />
        </FieldInput>

        <div className="header__profile">
          <span className="header__avatar">AC</span>
          <span>Иван Иванов</span>
        </div>
      </Header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
