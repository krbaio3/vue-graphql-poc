import { GetterTree } from 'vuex';
import { PostsState, Post } from './types';
import { RootState } from '../../types';

type PostsGetter = GetterTree<PostsState, RootState>;

export const getters: PostsGetter = {
  GETPOSTS(state: PostsState): Post[] {
    const {posts} = state;
    return posts;
  },
};
