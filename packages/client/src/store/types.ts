export interface RootState {
  processing: boolean;
  error: ErrorObject;
}

export interface ErrorObject {
    isError: boolean;
    message: string;
}
