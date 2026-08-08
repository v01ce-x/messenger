import * as React from 'react';
import './Button.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = (props: Props) => {
  const { className, children, onClick } = props;

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
