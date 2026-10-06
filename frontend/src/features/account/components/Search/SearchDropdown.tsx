import { Avatar } from '@/shared/ui';
import type { UserSearchResult } from '@/features/account';
import { Routes } from '@/shared/lib';
import { useNavigate } from 'react-router';
import './SearchForm.scss';
import { chatService } from '@/features/chat';

interface Props {
  searchResult: UserSearchResult[];
}

const SearchDropdown = (props: Props) => {
  const { searchResult } = props;

  const navigate = useNavigate();

  const onClick = async (userId: string) => {
    if (!userId) return;

    const { id: chatId } = await chatService.chatById(userId);

    navigate(Routes.chatById.replace(':id', chatId));
  };

  return (
    <div className="search-dropdown">
      <div className="search-dropdown__list">
        {searchResult.map((user) => (
          <div
            key={user.id}
            className="search-dropdown__item"
            onClick={() => onClick(user.id)}
          >
            <div className="search-dropdown__media">
              <Avatar
                title={`${user.firstName} ${user.lastName}`}
                avatar={user.avatar}
                className="search-dropdown__avatar"
              />
              <span className="search-dropdown__online" />
            </div>

            <div className="search-dropdown__info">
              <span className="search-dropdown__name">
                {user.firstName} {user.lastName}
              </span>
              <span className="search-dropdown__status">
                в сети или не в сети
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDropdown;
