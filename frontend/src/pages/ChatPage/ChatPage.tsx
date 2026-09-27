import { useOutlet } from 'react-router';
import { ChatList, useChats } from '@/features/chat';
import { InfoIcon } from '@/shared/ui';
import './ChatPage.scss';

const ChatPage = () => {
  const { data: chats } = useChats();
  const chatWindow = useOutlet();

  return (
    <div className="chats">
      <aside className="chats__aside">
        <div className="chats__head">
          <h2 className="chats__title">Чаты</h2>

          <span className="chats__count">{chats?.length ?? 0}</span>
        </div>

        <div className="chats__body">
          <ChatList />
        </div>
      </aside>

      <main className="chats__content">
        {chatWindow ?? (
          <div className="chats__placeholder">
            <span className="chats__placeholder-icon">
              <InfoIcon className="chats__placeholder-svg" />
            </span>

            <h3 className="chats__placeholder-title">Чат не выбран</h3>

            <p className="chats__placeholder-text">
              Выберите диалог в списке слева или начните новый, чтобы перейти к
              переписке
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
