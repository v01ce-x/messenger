import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateGroupChatDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: 'Минимальная длина массива 1' })
  @IsString({
    each: true,
    message: 'Каждый элемент массива должен быть строкой',
  })
  otherUserIds: string[];

  @IsString()
  @Length(3, 30, {
    message: 'Длина названия чата должна быть более 2 символов и менее 30',
  })
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}