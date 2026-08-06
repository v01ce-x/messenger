import * as React from 'react';
import './Button.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Button = (props: Props) => {
  const { className, children } = props;

  return <button className={className}>{children}</button>;
};

export default Button;
