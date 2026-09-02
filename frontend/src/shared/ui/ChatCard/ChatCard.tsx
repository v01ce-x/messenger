import './ChatCard.scss';
import { Avatar } from '@/shared/ui';
import { Routes } from '@/shared/lib';
import { Link } from 'react-router';

interface Props {
  title: string;
  chatId: string;
  lastMessage: string;
  avatar?: string;
  className?: string;
  onClick: (id: string) => void;
}

const ChatCard = (props: Props) => {
  const { title, chatId, lastMessage, avatar, className, onClick } = props;

  return (
    <Link to={Routes.chatById.replace(':id', chatId)}>
      <div className={`chat-card ${className}`} onClick={() => onClick(chatId)}>
        <Avatar title={title} avatar={avatar} className="chat-card__avatar" />

        <div className="chat-card__body">
          <span className="chat-card__title">{title}</span>
          <span className="chat-card__lastMessage">{lastMessage}</span>
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
