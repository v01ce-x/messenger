import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto, JoinChatDto } from './dto/message.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  handleConnection(client: Socket) {
    const authHeader =
      client.handshake.auth?.authorization ??
      client.handshake.headers.authorization ??
      client.handshake.query?.token;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      client.disconnect(true);
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify<{ id: string }>(token, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });

      client.data.userId = payload.id;
    } catch {
      client.disconnect(true);
    }
  }

  @SubscribeMessage('joinChat')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: JoinChatDto,
  ) {
    const userId = client.data.userId;
    const isMember = await this.chatService.isMember(dto.chatId, userId);

    if (!isMember) return { message: 'Доступ запрещён' };

    await client.join(`chat:${dto.chatId}`);
    return { ok: true };
  }

  @SubscribeMessage('leaveChat')
  async handleLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: { chatId: string },
  ) {
    client.leave(`chat:${dto.chatId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: CreateMessageDto,
  ) {
    const isMember = await this.chatService.isMember(
      dto.chatId,
      client.data.userId,
    );

    if (!isMember) {
      client.disconnect();
      return;
    }

    try {
      const message = await this.chatService.sendMessage(
        client.data.userId,
        dto,
      );

      this.server.to(`chat:${dto.chatId}`).emit('newMessage', message);

      return message;
    } catch (err) {
      console.log(err);
    }
  }
}
