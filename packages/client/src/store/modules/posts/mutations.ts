import { MutationTree } from 'vuex';
import { PostsState, Post } from './types';


type PostMutationsTree = MutationTree<PostsState>;

export const mutations: PostMutationsTree = {
  SETPOSTS(state: PostsState, payload: Post[]): void {
    state.posts = payload;
  },
};
