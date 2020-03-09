import { GetterTree } from 'vuex';
import { AuthState } from './types';
import { RootState } from '../../types';

type PostsGetter = GetterTree<AuthState, RootState>;

export const getters: PostsGetter = {
  GET_TOKEN(state: AuthState): string {
    const { token } = state;
    return token;
  },
  GET_LOADING_BTN(state: AuthState): boolean {
    const { loadingBtn } = state;
    return loadingBtn;
  },
};
