import { useAuthStore, useProfile } from '@/features/account';
import { Link, Navigate, Outlet } from 'react-router';
import { FieldInput, Header } from '@/shared/ui';
import { SearchIcon } from '@/assets/icons';
import { Routes } from '@/shared/lib';

export const ProtectedRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const { data: user } = useProfile();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header>
        <h1>Nexo</h1>

        <FieldInput placeholder="Поиск людей и групп" className="field__search">
          <SearchIcon className="icon--18" />
        </FieldInput>

        <Link to={Routes.profile} className="header__profile">
          <span className="header__avatar">
            {user ? user.firstName[0] + user.lastName[0] : 'NN'}
          </span>
          <span>{user ? user.firstName + ' ' + user.lastName : 'No Name'}</span>
        </Link>
      </Header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};
