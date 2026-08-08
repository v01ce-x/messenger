import { Modal } from '@/shared/ui';
import { EditCoverForm } from '@/features/account';
import '../EditAvatarModal.scss';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditCoverModal = (props: Props) => {
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
