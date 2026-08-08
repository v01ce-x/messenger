import { useAuthStore, useProfile } from '@/features/account';
import { Link, Navigate, Outlet } from 'react-router';
import { FieldInput, Header } from '@/shared/ui';
import { SearchIcon } from '@/assets/icons';
import { Routes } from '@/shared/lib';
import ModalProvider from './ModalProvider';
import { adapterUrl } from '@/shared/utils';

const ProtectedRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const { data: user } = useProfile();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="wrapper">
      <Header>
        <Link to={Routes.chat}>
          <h1>Nexo</h1>
        </Link>

        <FieldInput placeholder="Поиск людей и групп" className="field__search">
          <SearchIcon className="icon--18" />
        </FieldInput>

        <Link to={Routes.profile} className="header__profile">
          {user ? (
            user.avatar ? (
              <img
                className="header__avatar"
                src={adapterUrl(user.avatar)}
                alt="Аватарка"
              />
            ) : (
              <div className="header__avatar" />
            )
          ) : (
            <div className="header__avatar">
              <span>NN</span>
            </div>
          )}
          <span>{user ? user.firstName + ' ' + user.lastName : 'No Name'}</span>
        </Link>
      </Header>

      <main className="main">
        <Outlet />
      </main>

      <ModalProvider />
    </div>
  );
};

export default ProtectedRoute;
