import Vue from 'vue';
import { ActionContext, ActionTree } from 'vuex';
import { PostsState, Post } from './types';
import { RootState } from '@/store/types';

import { defaultClient as apolloClient} from '@/plugins/graphql';
import { gql, ApolloQueryResult } from 'apollo-boost';


type PostsActionContext = ActionContext<PostsState, RootState>;
type PostsActionTree = ActionTree<PostsState, RootState>;

export const actions: PostsActionTree = {
  async getPost(context: PostsActionContext): Promise<any> {
    try {
      // Use ApolloClient to fire getPosts query
      const {data}: ApolloQueryResult<Post[]> = await apolloClient.query({
        query: gql `
          query {
            getPosts {
              _id
              title
              imageUrl
            }
        }`,
      });
      const payload = data;
      // tslint:disable-next-line:no-console
      console.log(payload);
      // tslint:disable-next-line:no-console
      // console.log(response);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
    }
  },
};
