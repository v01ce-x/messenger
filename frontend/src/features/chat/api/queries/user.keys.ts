export const CHAT_USER_KEY = {
  all: ['chat'] as const,
  chatById: (id: string) => [...CHAT_USER_KEY.all, id],
  messagesByChat: (id: string) => [...CHAT_USER_KEY.chatById(id), id],
};
