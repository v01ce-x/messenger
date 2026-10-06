export interface ResponseToken {
  accessToken: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  middleName: string | null;
  login: string;
  avatar: string | null;
  cover: string | null;
}

export interface UserSearchResult {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}
