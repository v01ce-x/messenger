import './Header.scss'
import * as React from 'react';

interface Props {
  children?: React.ReactNode,
}

const Header = (props: Props) => {
  const { children } = props;

  return (
    <header className="header">
      <div className="header__inner">{children}</div>
    </header>
  );
}

export default Header;