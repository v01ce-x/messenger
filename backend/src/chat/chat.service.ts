import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupChatDto, OpenChatDto } from './dto/chat.dto';
import { CreateMessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  private findMessages(chatId: string) {
    return this.prismaService.message.findMany({
      where: {
        chatId: chatId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findChats(currentUserId: string) {
    const chats = await this.prismaService.chat.findMany({
      where: {
        userChats: {
          some: {
            userId: currentUserId,
          },
        },
      },
      include: {
        userChats: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return chats.map((chat) => {
      if (chat.type === 'GROUP') {
        return {
          id: chat.id,
          type: chat.type,
          title: chat.title,
          avatar: chat.avatar,
        };
      }

      const interlocutor = chat.userChats.find((user) => {
        return user.userId !== currentUserId;
      })?.user;

      return {
        id: chat.id,
        type: chat.type,
        title: interlocutor
          ? `${interlocutor.firstName} ${interlocutor.lastName}`
          : 'Удалённый аккаунт',
        avatar: interlocutor?.avatar || null,
      };
    });
  }

  async sendMessage(senderId: string, dto: CreateMessageDto) {
    return this.prismaService.message.create({
      data: {
        chatId: dto.chatId,
        senderId: senderId,
        text: dto.text,
      },
    });
  }

  async createPrivateChat(currentUserId: string, otherUserId: string) {
    const newChat = await this.prismaService.chat.create({
      data: {
        type: 'PRIVATE',
        userChats: {
          create: [
            {
              userId: currentUserId,
              userRole: 'ADMIN',
            },
            {
              userId: otherUserId,
              userRole: 'ADMIN',
            },
          ],
        },
      },
    });

    return {
      chatId: newChat.id,
      messages: [],
    };
  }

  async createGroupChat(currentUserId: string, dto: CreateGroupChatDto) {
    const otherUserIds = dto.otherUserIds;

    if (!otherUserIds.length) {
      return {
        message: 'No user id found.',
      };
    }

    const allUniqueUsers = otherUserIds.filter(
      (id, index) => otherUserIds.indexOf(id) === index && id !== currentUserId,
    );

    const newChat = await this.prismaService.chat.create({
      data: {
        type: 'GROUP',
        title: dto.title,
        avatar: dto.avatar,
        userChats: {
          create: [
            {
              userId: currentUserId,
              userRole: 'OWNER',
            },
            ...allUniqueUsers.map((id) => ({
              userId: id,
            })),
          ],
        },
      },
    });

    return {
      chatId: newChat.id,
      messages: [],
    };
  }

  async openPrivateChat(currentUserId: string, dto: OpenChatDto) {
    if (currentUserId === dto.otherUserId) {
      return {
        message: 'Нельзя открыть чат с самим собой',
      };
    }

    if (dto.otherUserId) {
      const chat = await this.prismaService.chat.findFirst({
        where: {
          type: 'PRIVATE',
          AND: [
            {
              userChats: {
                some: { userId: currentUserId },
              },
            },
            {
              userChats: {
                some: { userId: dto.otherUserId },
              },
            },
          ],
        },
      });

      if (!chat) {
        return await this.createPrivateChat(currentUserId, dto.otherUserId);
      }

      const messages = await this.findMessages(chat.id);

      return {
        chatId: chat.id,
        messages,
      };
    } else if (dto.chatId) {
      const chat = await this.prismaService.chat.findFirst({
        where: {
          id: dto.chatId,
        },
      });

      if (!chat) {
        throw new NotFoundException('Чат не найден');
      }

      const messages = await this.findMessages(chat.id);

      return {
        chatId: chat.id,
        messages,
      };
    } else {
      return {
        message: 'Передавйте chatId или otherUserId',
      };
    }
  }

  async openGroupChat(groupId: string) {
    const chat = await this.prismaService.chat.findFirst({
      where: {
        id: groupId,
      },
      include: {
        userChats: true,
      },
    });

    if (!chat) {
      throw new NotFoundException('Такого чата не существует');
    }

    const messages = await this.findMessages(chat.id);

    return {
      chatId: chat.id,
      messages,
    };
  }
}
