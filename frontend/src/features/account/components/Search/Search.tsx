import { SearchDropdown, SearchForm, useSearchUsers } from '@/features/account';
import { useRef, useState, type RefObject } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const Search = () => {
  const { data: searchResult } = useSearchUsers();
  const searchElement = useRef<HTMLDivElement>(null);
  const [showFoundUsers, setShowFoundUsers] = useState(false);

  const results = searchResult ?? [];
  const showDropdown = showFoundUsers && results.length > 0;

  useOnClickOutside<HTMLDivElement>(
    searchElement as RefObject<HTMLDivElement>,
    () => {
      setShowFoundUsers(false);
    },
  );

  return (
    <div
      className="search-form__wrapper"
      onClick={() => setShowFoundUsers(true)}
      ref={searchElement}
    >
      <SearchForm />
      {showDropdown ? <SearchDropdown searchResult={results} /> : null}
    </div>
  );
};

export default Search;
