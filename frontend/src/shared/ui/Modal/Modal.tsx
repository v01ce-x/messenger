import * as React from 'react';
import './Modal.scss';
import { CrossIcon } from '@/shared/ui';

interface Props {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

const Modal = (props: Props) => {
  const { title, onClose, children } = props;

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <span className="modal__title">{title}</span>
          <button onClick={onClose} className="modal__icon--close">
            <CrossIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
