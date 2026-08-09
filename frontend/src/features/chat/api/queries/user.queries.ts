import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/features/account';
import { chatService } from '@/features/chat/api';
import { CHAT_USER_KEY } from '@/features/chat/api/queries/user.keys.ts';

export const useChats = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryFn: chatService.chats,
    queryKey: CHAT_USER_KEY.all,
    enabled: isAuth,
  });
};
