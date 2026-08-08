import { useSearchParams } from 'react-router';

export type ModalType = 'editAvatar' | 'editCover' | null;

export const useModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentModal = searchParams.get('modal') as ModalType;

  const modalData = searchParams.get('modalData');

  const openModal = (
    name: Exclude<ModalType, null>,
    data?: string | number,
  ) => {
    searchParams.set('modal', name);
    if (data) {
      searchParams.set('modalData', String(data));
    }
    setSearchParams(searchParams, { replace: true });
  };

  const closeModal = () => {
    searchParams.delete('modal');
    searchParams.delete('modalData');
    setSearchParams(searchParams, { replace: true });
  };

  return {
    currentModal,
    modalData,
    openModal,
    closeModal,
  };
};
