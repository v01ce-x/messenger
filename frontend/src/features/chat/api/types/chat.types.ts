export interface ChatUser {
  id: string;
  type: 'GROUP' | 'PRIVATE';
  title: string;
  avatar?: string;
}
