import Vue from 'vue';
import { ActionContext, ActionTree } from 'vuex';
import { PostsState, Post, QueryGetPosts } from './types';
import { RootState } from '@/store/types';

import { defaultClient as apolloClient } from '@/plugins/graphql';
import { gql, ApolloQueryResult } from 'apollo-boost';


type PostsActionContext = ActionContext<PostsState, RootState>;
type PostsActionTree = ActionTree<PostsState, RootState>;

export const actions: PostsActionTree = {
  // Se puede usar sin el async/await
  async ACTPOST(context: PostsActionContext): Promise<any> {
    try {
      context.commit('startProcesing', null, { root: true });
      // Use ApolloCLient to fire getPosts query
      const { data, errors }: ApolloQueryResult<QueryGetPosts> = await apolloClient.query({
        query: gql`
          query {
            getPosts {
              _id
              title
              imageUrl
            }
        }`,
      });
      if (!errors) {
        context.commit('SETPOSTS', data.getPosts);
        // context.commit('setError', {isError: true, message: 'Esto es una prueba'}, { root: true });
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
      context.commit('setError', e, { root: true });
    } finally {
      context.commit('stopProcesing', null, { root: true });
    }
  },
};
