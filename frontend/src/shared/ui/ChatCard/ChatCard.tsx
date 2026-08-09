import './ChatCard.scss';
import { Avatar } from '@/shared/ui';

interface Props {
  title: string;
  chatId: string;
  lastMessage: string;
  avatar?: string | null;
  onClick: (id: string) => void;
}

const ChatCard = (props: Props) => {
  const { title, chatId, lastMessage, avatar, onClick } = props;

  return (
    <div className="chat-card" onClick={() => onClick(chatId)}>
      <Avatar title={title} avatar={avatar} className="chat-card__avatar" />

      <div className="chat-card__body">
        <span className="chat-card__title">{title}</span>
        <span className="chat-card__lastMessage">{lastMessage}</span>
      </div>
    </div>
  );
};

export default ChatCard;
