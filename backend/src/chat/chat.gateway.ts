import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/message.dto';
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
    console.log(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: CreateMessageDto,
  ) {
    const authHeader = client.handshake.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        message: 'Пользователь не авторизован',
      };
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });

      const currentUserId = payload.id;

      const message = this.chatService.sendMessage(currentUserId, dto);

      console.log(message);

      this.server.to(dto.chatId).emit('newMessage', message);

      return message;
    } catch (err) {
      console.log(err);
    }
  }
}
