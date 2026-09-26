import { LoginIcon } from '@/shared/ui';
import { Button, FieldCheckbox, FieldInput, FieldPassword } from '@/shared/ui';
import { loginSchema, type LoginSchema } from '@/features/account';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/features/account';
import './AuthForm.scss';

interface Props {
  className?: string;
}

const AuthForm = (props: Props) => {
  const { className } = props;
  const { mutate: loginMutate } = useLogin();

  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginSchema) => {
    loginMutate(data);
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <FieldInput
        label="Придумайте логин"
        placeholder="login123"
        error={formState.errors.login?.message}
        {...register('login')}
      >
        <LoginIcon className="icon--18" />
      </FieldInput>
      <FieldPassword
        label="Пароль"
        placeholder="********"
        error={formState.errors.password?.message}
        {...register('password')}
      />

      <div className="form__container">
        <FieldCheckbox label="Запомнить меня" {...register('remember')} />

        <a href="#" className="text-link">
          Забыли пароль?
        </a>
      </div>

      <Button className="button button--primary">Войти</Button>
    </form>
  );
};

export default AuthForm;
