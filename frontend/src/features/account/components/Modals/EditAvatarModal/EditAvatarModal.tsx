import { Modal } from '@/shared/ui';
import { EditAvatarForm } from '@/features/account';
import '../EditAvatarModal.scss';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditAvatarModal = (props: Props) => {
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
