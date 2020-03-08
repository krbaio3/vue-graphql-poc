import { MutationTree } from 'vuex';
import { PostsState, Post } from './types';


type PostMutationsTree = MutationTree<PostsState>;

export const mutations: PostMutationsTree = {
  SET_POSTS(state: PostsState, payload: Post[]): void {
    state.posts = payload;
  },
  SET_LOADING_POST(state: PostsState, payload: boolean): void {
    state.loading = payload;
  },
  SET_SEARCH_RESULTS(state: PostsState, payload: Post[] | []): void {
    state.postResults = payload;
  },
  SET_CLEAR_SEARCH_RESULTS(state: PostsState): void {
    state.postResults = [];
  },
  SET_USER_POST(state: PostsState, payload): void {
    state.userPost = payload;
  },
  // SET_DELETE_USER_POST(state: PostsState, payload: string): void {
  // },
};
