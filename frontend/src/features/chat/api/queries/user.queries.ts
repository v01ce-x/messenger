import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/features/account';
import { chatService } from '@/features/chat/api';
import { CHAT_USER_KEY } from '@/features/chat/api/queries/user.keys.ts';
import { useParams } from 'react-router';

export const useChats = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryFn: chatService.chats,
    queryKey: CHAT_USER_KEY.all,
    enabled: isAuth,
  });
};

export const useChatById = () => {
  const { id } = useParams<{ id: string }>();
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryFn: () => chatService.chatById(id!),
    queryKey: CHAT_USER_KEY.chatById(id!),
    enabled: isAuth && !!id,
  });
};

export const useMessages = (isChatReady: boolean) => {
  const { id: chatId } = useParams<{ id: string }>();

  return useQuery({
    queryFn: () => chatService.messages(chatId!),
    queryKey: CHAT_USER_KEY.messagesByChat(chatId!),
    enabled: isChatReady && !!chatId,
  });
};
