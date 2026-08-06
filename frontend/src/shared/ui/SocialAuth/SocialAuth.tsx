import * as React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const SocialAuth = (props: Props) => {
  const { children, className } = props;

  return <button className={className}>{children}</button>;
};

export default SocialAuth;
