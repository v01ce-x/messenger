import { Modal } from '@/shared/ui';
import { EditCoverForm } from '@/features/account';
import '../FormModal.scss';
import type { ModalProps } from '../modal.types.ts';

const EditCoverModal = (props: ModalProps) => {
  const { title, isOpen, onClose } = props;

  return (
    isOpen && (
      <Modal title={title} onClose={onClose}>
        <EditCoverForm />
      </Modal>
    )
  );
};

export default EditCoverModal;
