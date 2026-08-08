import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty({
    message: 'Поле Имя обязательно',
  })
  @MinLength(2, { message: 'Имя содержит минимум 2 буквы' })
  firstName: string;

  @IsNotEmpty({
    message: 'Поле Фамилия обязательно',
  })
  @MinLength(2, { message: 'Фамилия содержит минимум 2 буквы' })
  lastName: string;

  @IsNotEmpty({
    message: 'Поле Email обязательно для заполнения',
  })
  @IsString()
  @MinLength(2, { message: 'Логин содержит минимум 8 символов' })
  login: string;

  @IsNotEmpty({
    message: 'Поле Пароль обязательно для заполнения',
  })
  @Length(8, 50, {
    message:
      'Длина пароля не должна быть менее 8 символов и не более 50 символов',
  })
  password: string;
}
