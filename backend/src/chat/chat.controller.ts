import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Authorization } from '../user/decorators/authorization.decorator';
import { Authorized } from '../user/decorators/authorized.decorator';
import { CreateGroupChatDto, OpenChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('/private')
  @Authorization()
  openPrivateChat(
    @Authorized('id') currentUserId: string,
    @Body() dto: OpenChatDto,
  ) {
    return this.chatService.openPrivateChat(currentUserId, dto);
  }

  @Get('/group/:groupId')
  @Authorization()
  openGroupChat(@Param('groupId') groupId: string) {
    return this.chatService.openGroupChat(groupId);
  }

  @Post('/group')
  @Authorization()
  createGroupChat(
    @Authorized('id') currentUserId: string,
    @Body() dto: CreateGroupChatDto,
  ) {
    return this.chatService.createGroupChat(currentUserId, dto);
  }

  @Get('/all')
  @Authorization()
  findChats(@Authorized('id') currentUserId: string) {
    return this.chatService.findChats(currentUserId);
  }
}
