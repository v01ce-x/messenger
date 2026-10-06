import { Avatar } from '@/shared/ui';
import { Link } from 'react-router';
import './ChatCard.scss';

interface Props {
  title: string;
  chatId: string;
  lastMessage: string;
  avatar?: string;
  className?: string;
  onClick: (id: string) => void;
  route: string;
}

const ChatCard = (props: Props) => {
  const { title, chatId, lastMessage, avatar, className, onClick, route } =
    props;

  return (
    <Link to={route}>
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
