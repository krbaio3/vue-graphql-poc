export interface AuthState {
  token: string;
  loadingBtn: boolean;
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
