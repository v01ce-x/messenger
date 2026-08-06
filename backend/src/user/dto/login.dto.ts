import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty({
    message: 'Поле Email обязательно для заполнения',
  })
  @IsString()
  @MinLength(6, {
    message: 'Поле должно осдержать минимум 6 символов',
  })
  login: string;

  @IsNotEmpty({
    message: 'Поле Пароль обязательно для заполнения',
  })
  password: string;

  @IsBoolean()
  remember: boolean;
}
