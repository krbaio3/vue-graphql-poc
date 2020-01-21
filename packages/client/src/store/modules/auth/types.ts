export interface AuthState {
  token: string;
}

export interface QueryGetAuth {
  signInUser: {
    token: string;
  };
}

export interface SignInUser {
  username: string;
  password: string;
}
