import { useChats } from '@/features/chat/api';
import { useState } from 'react';
import { ChatCard } from '@/shared/ui';
import './ChatList.scss';

export const ChatList = () => {
  const { data: chats } = useChats();

  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const findPositionChat = () => {
    if (!chats || !activeChatId) return 0;

    const index = chats.findIndex((chat) => chat.id === activeChatId);

    const CARD_HEIGHT = 76;
    const GAP = 8;

    return index * (CARD_HEIGHT + GAP);
  };

  return (
    <div className="chats__list">
      {chats && activeChatId && (
        <div
          className="chats__item--active"
          style={{ transform: `translateY(${findPositionChat()}px)` }}
        />
      )}
      {chats &&
        chats.map((chat) => (
          <ChatCard
            onClick={() => setActiveChatId(chat.id)}
            chatId={chat.id}
            title={chat.title}
            avatar={chat.avatar}
            key={chat.id}
            className={activeChatId === chat.id ? 'chat-card--active' : ''}
            lastMessage="Hello, how are you?"
          />
        ))}
    </div>
  );
};

export default ChatList;
