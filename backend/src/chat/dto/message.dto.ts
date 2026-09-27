import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class JoinChatDto {
  @IsString()
  @IsNotEmpty()
  chatId: string;
}
