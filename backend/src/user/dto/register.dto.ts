import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty({
    message: 'Поле Имя обязательно',
  })
  name: string;

  @IsNotEmpty({
    message: 'Поле Email обязательно для заполнения',
  })
  @IsEmail(
    {},
    {
      message: 'Некорректный адрес электронной почты',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Поле Пароль обязательно для заполнения',
  })
  @Length(8, 50, {
    message:
      'Длина пароля не должна быть менее 8 символов и не более 50 символов',
  })
  password: string;
}
