import { ChatCard } from '@/shared/ui';
import './ChatPage.scss';
import { useChats } from '@/features/chat/api';
import { useState } from 'react';

const ChatPage = () => {
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
    <div className="chats__container">
      <aside className="chats__aside">
        <div>
          <h2>Чаты</h2>
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
                  lastMessage="Hello, how are you?"
                />
              ))}
          </div>
        </div>
      </aside>

      <div className="chat-window">
        <div className="chat-window__header"></div>
      </div>
    </div>
  );
};

export default ChatPage;
