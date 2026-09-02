import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Authorization } from '../user/decorators/authorization.decorator';
import { Authorized } from '../user/decorators/authorized.decorator';
import { CreateGroupChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/all')
  @Authorization()
  findChats(@Authorized('id') currentUserId: string) {
    return this.chatService.findChats(currentUserId);
  }

  @Post('/:chatId')
  @Authorization()
  async openPrivateChat(
    @Authorized('id') currentUserId: string,
    @Param('chatId') chatId: string,
  ) {
    return await this.chatService.openPrivateChat(currentUserId, chatId);
  }

  @Get('/:chatId')
  @Authorization()
  openGroupChat(@Param('chatId') chatId: string) {
    return this.chatService.openGroupChat(chatId);
  }

  @Post('/group')
  @Authorization()
  createGroupChat(
    @Authorized('id') currentUserId: string,
    @Body() dto: CreateGroupChatDto,
  ) {
    return this.chatService.createGroupChat(currentUserId, dto);
  }

  @Get('/messages/:chatId')
  @Authorization()
  findMessage(
    @Param('chatId') chatId: string,
    @Authorized('id') currentUserId: string,
  ) {
    return this.chatService.findMessages(chatId, currentUserId);
  }
}
