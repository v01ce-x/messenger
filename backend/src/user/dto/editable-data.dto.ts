import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class EditableDataDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Имя содержит минимум 2 буквы' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Фамилия содержит минимум 2 буквы' })
  lastName: string;

  @IsOptional()
  @IsString()
  middleName: string;
}
