import { FieldSearch, SearchIcon } from '@/shared/ui';
import { useSearchStore } from '@/features/account';
import './SearchForm.scss';

const SearchForm = () => {
  const setSearchValue = useSearchStore((state) => state.setSearchValue);

  return (
    <form className="search-form" onSubmit={(event) => event.preventDefault()}>
      <FieldSearch
        placeholder="Поиск людей и групп"
        className="field__search"
        onChange={(newSearchValue) => setSearchValue(newSearchValue)}
      >
        <SearchIcon className="icon--18" />
      </FieldSearch>
    </form>
  );
};

export default SearchForm;
