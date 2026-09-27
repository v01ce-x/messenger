import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/features/account';
import { chatService, type Message } from '@/features/chat';
import { CHAT_USER_KEY } from './chat.keys.ts';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { getSocket } from '@/shared/websocket';

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

export const useNewMessage = (chatId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !chatId) return;

    const onNewMessage = (message: Message) => {
      if (message.chatId !== chatId) return;

      queryClient.setQueryData<Message[]>(
        CHAT_USER_KEY.messagesByChat(chatId),
        (prev = []) =>
          prev.some((msg) => msg.id === message.id) ? prev : [...prev, message],
      );
    };

    socket.on('newMessage', onNewMessage);
    return () => {
      socket.off('newMessage', onNewMessage);
    };
  }, [queryClient, chatId]);
};
