import { GetterTree } from 'vuex';
import { PostsState, Post } from './types';
import { RootState } from '../../types';

type PostsGetter = GetterTree<PostsState, RootState>;

export const getters: PostsGetter = {
  GET_POST(state: PostsState): Post[] {
    const { posts } = state;
    return posts;
  },
  GET_LOADING_POST(state: PostsState): boolean {
    const { loading } = state;
    return loading;
  },
  GET_SEARCH_RESULTS(state: PostsState): Post[] | [] {
    const { postResults } = state;
    return postResults;
  },
  GET_USER_POST(state: PostsState): Post[] | [] {
    const { userPost } = state;
    return userPost;
  },
};
