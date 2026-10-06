import { create } from 'zustand';
import type { UserSearchResult } from '@/features/account';

interface SearchStore {
  searchValue?: string;
  searchResult?: UserSearchResult[];
  setSearchValue: (value: string) => void;
  setSearchResult: (result: UserSearchResult[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => {
  return {
    searchValue: '',
    searchResults: [],

    setSearchValue: (value: string) => {
      set({
        searchValue: value,
      });
    },

    setSearchResult: (result: UserSearchResult[]) => {
      set({
        searchResult: result,
      });
    },
  };
});
