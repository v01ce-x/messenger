import { SocialAuth } from '@/shared/ui';
import { RegisterForm, SOCIAL_AUTH_LIST } from '@/features/account';
import '../AuthPage/AuthPage.scss';
import { Link } from 'react-router';
import { Routes } from '@/shared/lib';

const RegisterPage = () => {
  return (
    <div className="auth">
      <div className="auth__header">
        <h2 className="auth__title">Создать аккаунт</h2>
        <span className="auth__sub">
          Заполните форму, чтобы начать пользоваться Nexo
        </span>
      </div>

      <RegisterForm className="auth__form" />

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
        Уже есть аккаунт?{' '}
        <Link to={Routes.login} className="text-link">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
