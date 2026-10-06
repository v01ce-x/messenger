import { Link } from 'react-router';
import { Search, useProfile } from '@/features/account';
import { Routes } from '@/shared/lib';
import { Avatar } from '@/shared/ui';
import './Header.scss';

const Header = () => {
  const { data: user } = useProfile();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to={Routes.chat}>
          <h1>Nexo</h1>
        </Link>

        <Search />

        <Link to={Routes.profile} className="header__profile">
          {user ? (
            <Avatar
              title={`${user.firstName} ${user.lastName}`}
              avatar={user.avatar}
              className="header__avatar"
            />
          ) : (
            <div className="header__avatar">
              <span>NN</span>
            </div>
          )}
          <span>{user ? user.firstName + ' ' + user.lastName : 'No Name'}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
