import { api } from '@/shared/api';
import type { ChatsUser, ChatUserById, Message } from '@/features/chat/api';

export const chatService = {
  chats: () => api.get<ChatsUser[]>('/chat/all').then((res) => res.data),

  chatById: (id: string) =>
    api.post<ChatUserById>(`/chat/${id}`).then((res) => res.data),

  messages: (chatId: string) =>
    api.get<Message[]>(`/chat/messages/${chatId}`).then((res) => res.data),
};
