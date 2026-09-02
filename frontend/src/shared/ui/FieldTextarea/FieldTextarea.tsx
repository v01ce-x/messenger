import React, { useRef } from 'react';
import './FieldTextarea.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const MessageInput = (props: Props) => {
  const { value, onChange, handleKeyDown } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    textarea.style.height = 'auto';

    const maxHeight = 105;

    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={handleKeyDown}
      rows={1}
      placeholder="Напишите сообщение..."
      className="field__textarea"
    />
  );
};

export default MessageInput;
