export interface ChatsUser {
  id: string;
  type: 'GROUP' | 'PRIVATE';
  title: string;
  avatar?: string;
}

export interface ChatUserById {
  id: string;
  type: 'GROUP' | 'PRIVATE';
  title: string;
  avatar: string;
}

export interface Message {
  id: string;
  chatId: string;
  text: string;
  createdAt: Date;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}
