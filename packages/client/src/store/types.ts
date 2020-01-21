export interface RootState {
  processing: boolean;
  error: ErrorObject;
  user: User;
}

export interface ErrorObject {
  isError: boolean;
  message: string;
}

export interface User {
  // __typename: string;
  // _id: string;
  avatar: string;
  email: string;
  favorites: string[];
  joinDate: string;
  password: string;
  username: string;

}
