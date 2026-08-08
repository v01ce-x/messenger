import AuthForm from '@/features/account/components/AuthForm/AuthForm.tsx';
import { SocialAuth } from '@/shared/ui';
import { SOCIAL_AUTH_LIST } from '@/features/account';
import './AuthPage.scss';
import { Link } from 'react-router';
import { Routes } from '@/shared/lib';

const AuthPage = () => {
  return (
    <div className="auth">
      <div className="auth__header">
        <h2 className="auth__title">С возвращением</h2>
        <span className="auth__sub">
          Войдите в аккаунт, чтобы продолжить общение.
        </span>
      </div>

      <AuthForm className="auth__form" />

      <span className="auth__divider">Или продолжить с</span>

      <div className="auth__social--list">
        {SOCIAL_AUTH_LIST.map((item) => (
          <SocialAuth key={item.id} className="auth__social--item">
            <div>
              {item.icon}
              <span>{item.label}</span>
            </div>
          </SocialAuth>
        ))}
      </div>

      <p className="auth__footer">
        Нет аккаунта?{' '}
        <Link to={Routes.register} className="text-link">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};

export default AuthPage;
