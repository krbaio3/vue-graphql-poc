import Vue from 'vue';
import { ActionContext, ActionTree } from 'vuex';
import { PostsState, QueryGetPosts, AddPost } from './types';
import { RootState } from '@/store/types';

import { defaultClient as apolloClient } from '@/plugins/graphql';
import { ApolloQueryResult } from 'apollo-boost';
import gqlGetPost from '@/components/Post/queries/GetPosts.graphql';


type PostsActionContext = ActionContext<PostsState, RootState>;
type PostsActionTree = ActionTree<PostsState, RootState>;

export const actions: PostsActionTree = {
  // Se puede usar sin el async/await
  async ACT_POST(context: PostsActionContext): Promise<any> {
    try {
      context.commit('startProcessing', null, { root: true });
      // Use ApolloCLient to fire getPosts query
      const { data, errors }: ApolloQueryResult<QueryGetPosts> = await apolloClient.query({
        query: gqlGetPost,
      });
      if (!errors) {
        context.commit('SETPOSTS', data.getPosts);
        // context.commit('setError', {isError: true, message: 'Esto es una prueba'}, { root: true });
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
      // context.commit('setError', e, { root: true });
    } finally {
      context.commit('stopProcessing', null, { root: true });
    }
  },
  ACT_LOADING_POST(context: PostsActionContext, payload: boolean): void {
    context.commit('SET_LOADING_POST', payload);
  },
  ACT_ADD_POST(context: PostsActionContext, payload: AddPost) {
    try {
      context.commit('startProcessing', null, { root: true });
      context.dispatch('ACT_LOADING_POST', true);
      console.log('entra');
    } catch (error) {
      console.error('entra');
    } finally {
      context.dispatch('ACT_LOADING_POST', false);
      context.commit('stopProcessing', null, { root: true });
    }
  },
};
