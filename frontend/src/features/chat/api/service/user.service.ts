import { api } from '@/shared/api';
import type { ChatUser } from '@/features/chat/api';

export const chatService = {
  chats: () => api.get<ChatUser[]>('/chat/all').then((res) => res.data),
};
