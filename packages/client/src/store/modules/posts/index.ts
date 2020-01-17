import {Module} from 'vuex';
import { RootState } from '../../types';
import { actions } from './actions';
import { PostsState } from './types';
import { state } from './state';

const namespaced: boolean = true;

type PostModule = Module<PostsState, RootState>;

export const postsModule: PostModule = {
  namespaced,
  state,
  actions,
};
