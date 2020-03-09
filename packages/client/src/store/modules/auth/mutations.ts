import { MutationTree } from 'vuex';
import { AuthState } from './types';


type AuthMutationsTree = MutationTree<AuthState>;

export const mutations: AuthMutationsTree = {
  SET_TOKEN(state: AuthState, payload: string): void {
    state.token = payload;
    // localStorage.token = payload;
    localStorage.setItem('token', payload);
  },
  SET_LOADING_BTN(state: AuthState, payload: boolean): void {
    state.loadingBtn = payload;
  },
};
