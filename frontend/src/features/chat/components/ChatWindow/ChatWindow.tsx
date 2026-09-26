import React, { useState } from 'react';
import { useChatById, useMessages } from '@/features/chat/api';
import { Avatar, FieldTextarea, EnterMessageIcon, Message } from '@/shared/ui';
import { useAuthStore } from '@/features/account';
import './ChatWindow.scss';

const ChatWindow = () => {
  const {
    data: chat,
    isLoading: isChatLoading,
    isSuccess: isChatReady,
  } = useChatById();

  const { data: messages } = useMessages(isChatReady);

  const [message, setMessage] = useState('');
  const userId = useAuthStore((state) => state.userId);

  const sendMessage = () => {
    console.log(message);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
      console.log(messages);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-window__header">
        {chat && !isChatLoading && (
          <>
            <Avatar
              className="chat-window__avatar"
              avatar={chat.avatar}
              title={chat.title}
            />
            <span>{chat.title}</span>
          </>
        )}
      </div>

      <div className="chat-window__body">
        <div className="chat-window__messages">
          {messages && messages.length ? (
            messages.map((msg) => (
              <Message
                key={msg.id}
                text={msg.text}
                createdAt={msg.createdAt}
                sender={msg.sender}
                isMe={msg.sender.id === userId}
              />
            ))
          ) : (
            <span></span>
          )}
        </div>
        <div className="chat-window__textarea">
          <FieldTextarea
            value={message}
            handleKeyDown={handleKeyDown}
            onChange={(messageInput) => setMessage(messageInput)}
          />
          <button className="chat-window__button" onClick={sendMessage}>
            <EnterMessageIcon className="chat-window__icon--enter" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
