import type { ModalProps } from '../modal.types.ts';
import { Modal } from '@/shared/ui';
import EditProfileForm from '@/features/account/components/EditProfileForm/EditProfileForm.tsx';

const EditProfileModal = (props: ModalProps) => {
  const { title, isOpen, onClose } = props;

  return (
    isOpen && (
      <Modal title={title} onClose={onClose}>
        <EditProfileForm />
      </Modal>
    )
  );
};

export default EditProfileModal;
