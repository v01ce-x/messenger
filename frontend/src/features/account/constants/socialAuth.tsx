import * as React from 'react';
import { GoogleIcon } from '@/assets/icons';

interface SocialAuth {
  id: number;
  label: string;
  icon: React.ReactNode;
}

export const SOCIAL_AUTH_LIST: SocialAuth[] = [
  {
    id: 1,
    label: 'Google',
    icon: <GoogleIcon />,
  },
  {
    id: 2,
    label: 'Социальная сеть',
    icon: <GoogleIcon />,
  },
];