import { MutationTree } from 'vuex';
import { PostsState, Post } from './types';


type PostMutationsTree = MutationTree<PostsState>;

export const mutations: PostMutationsTree = {
  SETPOSTS(state: PostsState, payload: Post[]): void {
    state.posts = payload;
  },
  SET_LOADING_POST(state: PostsState, payload: boolean): void {
    state.loading = payload;
  },
};
