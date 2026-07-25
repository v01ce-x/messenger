import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
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
  password: string;
}