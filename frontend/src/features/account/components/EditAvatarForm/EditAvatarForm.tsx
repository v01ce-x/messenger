import { Button, FieldFile } from '@/shared/ui';
import { useUpdateAvatar } from '@/features/account';
import { useState } from 'react';

const EditAvatarForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate: uploadAvatar } = useUpdateAvatar();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    uploadAvatar(formData);
  };

  return (
    <form className="modal__form--edit-avatar" onSubmit={handleSubmit}>
      <FieldFile onFileSelect={(file) => setFile(file)} />

      <Button className="button button--primary">Сохранить</Button>
    </form>
  );
};

export default EditAvatarForm;
