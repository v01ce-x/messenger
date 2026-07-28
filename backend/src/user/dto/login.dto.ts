import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty({
    message: 'Поле Email обязательно для заполнения',
  })
  @IsString()
  login: string;

  @IsNotEmpty({
    message: 'Поле Пароль обязательно для заполнения',
  })
  password: string;
}