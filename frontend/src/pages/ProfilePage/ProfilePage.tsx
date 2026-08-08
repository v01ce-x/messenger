import { CameraIcon, EditIcon, InfoIcon, SettingsIcon } from '@/assets/icons';
import './ProfilePage.scss';
import { Button } from '@/shared/ui';
import { useProfile } from '@/features/account';
import { useModal } from '@/shared/lib';
import { adapterUrl } from '@/shared/utils/adapterUrl.ts';

const ProfilePage = () => {
  const { data: user, isLoading } = useProfile();
  const { openModal } = useModal();

  return (
    <>
      {isLoading && <h2>Загрузка...</h2>}
      {!isLoading && !user && <h2>Данные не загрузились</h2>}
      {user && (
        <div className="profile">
          <div className="profile__hero">
            <div
              className={`profile__cover ${user.cover ? '' : 'profile__cover--bg'}`}
              style={
                user.cover
                  ? {
                      backgroundImage: `url(${adapterUrl(user.cover)})`,
                    }
                  : {}
              }
            >
              <button
                onClick={() => openModal('editCover')}
                className="profile__button--edit-cover"
              >
                <EditIcon className="icon--18" />
              </button>
            </div>

            <div className="profile__identity">
              <div className="profile__info">
                <div className="profile__avatar-wrap">
                  {user.avatar ? (
                    <img
                      className="profile__avatar"
                      src={adapterUrl(user.avatar)}
                      alt="Аватарка"
                    />
                  ) : (
                    <div className="profile__avatar">
                      <span>{user.firstName[0] + user.lastName[0]}</span>
                    </div>
                  )}
                  <div
                    onClick={() => openModal('editAvatar')}
                    className="profile__button--edit-avatar"
                  >
                    <CameraIcon className="icon--18" />
                  </div>
                </div>
              </div>

              <div className="profile__buttons">
                <Button className="button button--secondary profile__button--settings">
                  <SettingsIcon className="icon__settings" />
                  <span>Настройки</span>
                </Button>
                <Button className="button button--primary profile__button--edit-profile">
                  <EditIcon className="icon__edit-profile" />
                  <span>Редактировать профиль</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="profile__card">
            <h3 className="card-info__title">
              <InfoIcon className="card-info__icon" />
              Информация
            </h3>

            <div className="card-info__list">
              <div className="card-info__item">
                <span className="card-info__label">Имя:</span>
                <span className="card-info__value">
                  {user.firstName ?? 'Не указано'}
                </span>
              </div>
              <div className="card-info__item">
                <span className="card-info__label">Фамилия:</span>
                <span className="card-info__value">
                  {user.lastName ?? 'Не указано'}
                </span>
              </div>
              <div className="card-info__item">
                <span className="card-info__label">Отчество:</span>
                <span className="card-info__value">
                  {user.middleName ?? 'Не указано'}
                </span>
              </div>
              <div className="card-info__item">
                <span className="card-info__label">Логин:</span>
                <span className="card-info__value">
                  {user.login ?? 'Не указано'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
