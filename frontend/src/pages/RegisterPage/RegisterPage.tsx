import { SocialAuth } from '@/shared/ui';
import { RegisterForm, SOCIAL_AUTH_LIST } from '@/features/account';
import './RegisterPage.scss';
import { Link } from 'react-router';
import { Routes } from '@/shared/lib';

const AuthPage = () => {
  return (
    <div className="register">
      <div className="register__header">
        <h2 className="register__title">Создать аккаунт</h2>
        <span className="register__sub">
          Заполните форму, чтобы начать пользоваться Nexo
        </span>
      </div>

      <RegisterForm className="register__form" />

      <span className="register__divider">Или продолжить с</span>

      <div className="register__social--list">
        {SOCIAL_AUTH_LIST.map((item) => (
          <SocialAuth key={item.id} className="register__social--item">
            <div>
              {item.icon}
              <span>{item.label}</span>
            </div>
          </SocialAuth>
        ))}
      </div>

      <p className="register__footer">
        Уже есть аккаунт?{' '}
        <Link to={Routes.login} className="text-link">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default AuthPage;
