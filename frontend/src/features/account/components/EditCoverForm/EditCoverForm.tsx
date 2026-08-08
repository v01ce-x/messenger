import { Button, FieldFile } from '@/shared/ui';
import { useUpdateCover } from '@/features/account';
import { useState } from 'react';

const EditCoverForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate: uploadCover } = useUpdateCover();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('cover', file);

    uploadCover(formData);
  };

  return (
    <form className="modal__form--edit-avatar" onSubmit={handleSubmit}>
      <FieldFile onFileSelect={(file) => setFile(file)} />

      <Button className="button button--primary">Сохранить</Button>
    </form>
  );
};

export default EditCoverForm;
