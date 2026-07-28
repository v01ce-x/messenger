import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty({
    message: 'Поле Имя обязательно',
  })
  firstName: string;

  @IsNotEmpty({
    message: 'Поле Фамилия обязательно',
  })
  lastName: string;

  @IsNotEmpty({
    message: 'Поле Email обязательно для заполнения',
  })
  @IsString()
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
