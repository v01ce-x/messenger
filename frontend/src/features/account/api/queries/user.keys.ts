export const USER_QUERY_KEYS = {
  all: ['user'] as const,
  profile: () => [...USER_QUERY_KEYS.all, 'profile'],
  search: (searchValue?: string) => [
    ...USER_QUERY_KEYS.all,
    'search',
    searchValue,
  ],
};
