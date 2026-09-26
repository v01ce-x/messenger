import { Button, FieldFile, FieldInput } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  editProfileSchema,
  type EditProfileSchema,
  useEditProfile,
  useProfile,
} from '@/features/account';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserIcon } from '@/shared/ui';

const EditProfileForm = () => {
  const [coverFile, setCoverFile] = useState<File | null>();
  const [avatarFile, setAvatarFile] = useState<File | null>();

  const { data: profile } = useProfile();
  const { mutate: editProfile } = useEditProfile();
  const { register, handleSubmit, formState, reset } =
    useForm<EditProfileSchema>({
      resolver: zodResolver(editProfileSchema),
      mode: 'onChange',
    });

  const onSubmit = (data: EditProfileSchema) => {
    const formData = new FormData();

    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('middleName', data.middleName);

    if (coverFile) {
      formData.append('cover', coverFile);
    }
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    editProfile(formData);
  };

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        middleName: profile.middleName ?? '',
      });
    }
  }, [profile, reset]);

  return (
    <form
      className="modal__form--edit-profile"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldInput
        label="Фамилия"
        placeholder="Иванов"
        error={formState.errors.lastName?.message}
        {...register('lastName')}
      >
        <UserIcon className="icon--18" />
      </FieldInput>
      <FieldInput
        label="Имя"
        placeholder="Иван"
        error={formState.errors.firstName?.message}
        {...register('firstName')}
      >
        <UserIcon className="icon--18" />
      </FieldInput>
      <FieldInput
        label="Отчество"
        placeholder="Иванович"
        error={formState.errors.middleName?.message}
        {...register('middleName')}
      >
        <UserIcon className="icon--18" />
      </FieldInput>
      <FieldFile
        label="Аватарка"
        onFileSelect={(file) => setAvatarFile(file)}
      />
      <FieldFile
        label="Задний фон"
        onFileSelect={(file) => setCoverFile(file)}
      />
      <Button className="button button--primary">Сохранить</Button>
    </form>
  );
};

export default EditProfileForm;
