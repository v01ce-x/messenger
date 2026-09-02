import { Avatar } from '@/shared/ui';
import './Message.scss';
import { adapterDate } from '@/shared/utils';

interface Sender {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface Props {
  text: string;
  createdAt: Date;
  sender: Sender;
  isMe: boolean;
}

const Message = (props: Props) => {
  const { text, createdAt, sender, isMe } = props;

  const getMessageClassName = (value: string) => {
    if (value === '') {
      return `${`message--${isMe ? 'me' : 'someone'}`}`;
    }

    return `${`message__${value}--${isMe ? 'me' : 'someone'}`}`;
  };

  return (
    <div className={`message ${getMessageClassName('')}`}>
      <div className={`message__inner ${getMessageClassName('inner')}`}>
        <Avatar
          className="message__avatar"
          avatar={sender.avatar}
          title={`${sender.firstName} ${sender.lastName}`}
        />
        <div
          className={`message__content ${getMessageClassName('content')}`}
        >
          <span
            className={`message__text ${getMessageClassName('text')}`}
          >
            {text}
          </span>
          <span className="message__createdAt">{adapterDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
