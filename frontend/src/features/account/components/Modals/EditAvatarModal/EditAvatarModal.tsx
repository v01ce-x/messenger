import { Modal } from '@/shared/ui';
import { EditAvatarForm } from '@/features/account';
import type { ModalProps } from '../modal.types.ts';
import '../FormModal.scss';

const EditAvatarModal = (props: ModalProps) => {
  const { title, isOpen, onClose } = props;

  return (
    isOpen && (
      <Modal title={title} onClose={onClose}>
        <EditAvatarForm />
      </Modal>
    )
  );
};

export default EditAvatarModal;
