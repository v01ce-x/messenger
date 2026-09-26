import {
  Button,
  FieldInput,
  FieldPassword,
  LoginIcon,
  UserIcon,
} from '@/shared/ui';
import {
  registerSchema,
  type RegisterSchema,
  useRegister,
} from '@/features/account';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import './RegisterForm.scss';

interface Props {
  className?: string;
}

const RegisterForm = (props: Props) => {
  const { className } = props;
  const { mutate: registerMutate } = useRegister();

  const { register, handleSubmit, formState, watch } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const passwordValue = watch('password') || '';
  const colors = ['#e5484d', '#f2a93b', '#f2a93b', '#29b473'];

  const onSubmit = (data: RegisterSchema) => {
    registerMutate({
      firstName: data.firstName,
      lastName: data.lastName,
      login: data.login,
      password: data.password,
    });
  };

  const getProtectionLevel = (value: string): number => {
    if (!value) return 0;

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    return score;
  };

  const level = getProtectionLevel(passwordValue);

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <FieldInput
        label="Фамилия"
        placeholder="Иванов"
        error={formState.errors.lastName?.message}
        {...register('lastName')}
      >
        <UserIcon className="icon--18" />
      </FieldInput>
      <FieldInput
        label="Имя"
        placeholder="Иван"
        error={formState.errors.firstName?.message}
        {...register('firstName')}
      >
        <UserIcon className="icon--18" />
      </FieldInput>

      <FieldInput
        label="Логин"
        placeholder="login123"
        error={formState.errors.login?.message}
        {...register('login')}
      >
        <LoginIcon className="icon--18" />
      </FieldInput>
      <div className="input__box">
        <FieldPassword
          label="Пароль"
          placeholder="********"
          error={formState.errors.password?.message}
          {...register('password')}
        />
        <div className="protection-level">
          {colors.map((_color, index) => (
            <span
              key={index}
              style={
                level >= index + 1 ? { backgroundColor: colors[level - 1] } : {}
              }
            />
          ))}
        </div>
      </div>
      <FieldPassword
        label="Повторите пароль"
        placeholder="********"
        error={formState.errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button className="button button--primary">Зарегистрироваться</Button>
    </form>
  );
};

export default RegisterForm;
