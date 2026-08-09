export const USER_QUERY_KEYS = {
  all: ['user'] as const,
  profile: () => [...USER_QUERY_KEYS.all, 'profile'],
};
