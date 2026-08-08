import { useModal } from '@/shared/lib';
import { EditAvatarModal, EditCoverModal } from '@/features/account';

const ModalProvider = () => {
  const { currentModal, closeModal } = useModal();

  return (
    <>
      <EditAvatarModal
        title="Загрузите новую авaтарку"
        isOpen={currentModal === 'editAvatar'}
        onClose={closeModal}
      />

      <EditCoverModal
        title="Загрузите новый фон"
        isOpen={currentModal === 'editCover'}
        onClose={closeModal}
      />
    </>
  );
};

export default ModalProvider;
