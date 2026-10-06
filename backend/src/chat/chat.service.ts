import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupChatDto } from './dto/chat.dto';
import { CreateMessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async isMember(chatId: string, userId: string) {
    return await this.prismaService.userChat.findFirst({
      where: {
        chatId: chatId,
        userId: userId,
      },
    });
  }

  async findMessages(chatId: string, currentUserId: string) {
    return await this.prismaService.message.findMany({
      where: {
        chatId: chatId,
        chat: {
          userChats: {
            some: { userId: currentUserId },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        chatId: true,
        text: true,
        createdAt: true,
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
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
        messages: {
          some: {}
        }
      },
      include: {
        userChats: {
          include: {
            user: {
              select: {
                id: true,
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

        const memberRelation = chat.userChats.find(
            (member) => member.userId !== currentUserId
        );
        const interlocutor = memberRelation?.user;

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
      select: {
        id: true,
        chatId: true,
        text: true,
        createdAt: true,
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
  }

  async createPrivateChat(currentUserId: string, otherUserId: string) {
    return await this.prismaService.chat.create({
      data: {
        type: 'PRIVATE',
        userChats: {
          create: [
            { userId: currentUserId, userRole: 'ADMIN' },
            { userId: otherUserId, userRole: 'ADMIN' },
          ],
        },
      },
      include: {
        userChats: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
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
    };
  }

  async openPrivateChat(currentUserId: string, chatOrUserId: string) {
    if (currentUserId === chatOrUserId) {
      return {
        message: 'Нельзя открыть чат с самим собой',
      };
    }

    const includeUsersConfig = {
      userChats: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
      },
    };

    let chat: any = null;

    const chatByDirectId = await this.prismaService.chat.findFirst({
      where: {
        id: chatOrUserId,
      },
      include: includeUsersConfig,
    });

    if (chatByDirectId) {
      chat = chatByDirectId;
    } else {
      const existingPrivateChat = await this.prismaService.chat.findFirst({
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
                some: { userId: chatOrUserId },
              },
            },
          ],
        },
        include: includeUsersConfig,
      });

      if (existingPrivateChat) {
        chat = existingPrivateChat;
      }
    }

    if (!chat) {
      chat = await this.createPrivateChat(currentUserId, chatOrUserId);
    }

    const memberRelation = chat.userChats.find(
      (member: any) => member.userId !== currentUserId,
    );
    const interlocutor = memberRelation?.user;

    return {
      id: chat.id,
      type: chat.type,
      title: `${interlocutor.firstName} ${interlocutor.lastName}`,
      avatar: interlocutor.avatar,
    };
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

    return {
      chatId: chat.id,
    };
  }
}
