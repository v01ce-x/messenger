import { Outlet } from 'react-router';
import { ChatList } from '@/features/chat/components';
import './ChatPage.scss';

const ChatPage = () => {
  return (
    <div className="chats__container">
      <aside className="chats__aside">
        <div>
          <h2>Чаты</h2>
          <ChatList />
        </div>
      </aside>

      <Outlet />
    </div>
  );
};

export default ChatPage;
