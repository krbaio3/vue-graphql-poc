/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { defaultClient as apolloClient } from '@/plugins/graphql';
import { ApolloQueryResult } from 'apollo-boost';
import gqlGetPost from '@/components/Post/queries/GetPosts.graphql';
import gqlAddPost from '@/components/Post/queries/AddPosts.graphql';
import gqlSearchPost from '@/components/Post/queries/SearchPost.graphql';
import { GraphQLError } from 'graphql';
import {
  PostsState, QueryGetPosts, AddPost, Post,
} from './types';


type PostsActionContext = ActionContext<PostsState, RootState>;
type PostsActionTree = ActionTree<PostsState, RootState>;

export const actions: PostsActionTree = {
  // Se puede usar sin el async/await
  async ACT_POST(context: PostsActionContext): Promise<void> {
    try {
      context.commit('startProcessing', null, { root: true });
      // Use ApolloCLient to fire getPosts query
      const { data, errors }: ApolloQueryResult<QueryGetPosts> = await apolloClient.query({
        query: gqlGetPost,
      });
      if (!errors) {
        context.commit('SET_POSTS', data.getPosts);
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
      // context.commit('setError', e, { root: true });
    } finally {
      context.commit('stopProcessing', null, { root: true });
    }
  },
  ACT_SEARCH_POST(context: PostsActionContext, payload: string): Promise<Post[] | ''> {
    return new Promise<Post[] | ''>((resolve, reject) => {
      const variables = { searchTerm: payload };
      try {
        context.commit('startProcessing', null, { root: true });
        apolloClient.query({
          query: gqlSearchPost,
          variables,
        }).then(({ data }) => {
          context.commit('SET_SEARCH_RESULTS', data.searchPost);
          resolve(data.searchPost);
        })
          .catch((error: GraphQLError) => {
            console.error(error);
            context.commit('setError', error, { root: true });
            reject(error);
          });
      } catch (error) {
        console.error(error);
        context.commit('setError', error, { root: true });
        reject(error);
      } finally {
        context.commit('stopProcessing', null, { root: true });
      }
    });
  },
  ACT_CLEAR_SEARCH_POST(context: PostsActionContext) {
    context.commit('SET_CLEAR_SEARCH_RESULTS');
  },
  ACT_LOADING_POST(context: PostsActionContext, payload: boolean): void {
    context.commit('SET_LOADING_POST', payload);
  },
  ACT_ADD_POST(context: PostsActionContext, payload: AddPost): Promise<Post | GraphQLError> {
    return new Promise<Post | GraphQLError>(async (resolve, reject) => {
      try {
        context.commit('startProcessing', null, { root: true });
        context.dispatch('ACT_LOADING_POST', true);

        const { data, errors } = await apolloClient.mutate({
          mutation: gqlAddPost,
          variables: payload,
          // @ts-ignore
          update: (cache, { data: { addPost } }) => {
            type cacheReadQuery = any;
            //   console.log(data);
            // first read the query you want to update
            const dataPosts: cacheReadQuery = cache.readQuery({ query: gqlGetPost });
            // crete updated data
            console.log(dataPosts);
            dataPosts.getPosts.unshift(addPost);
            // write updated data baack to query
            cache.writeQuery({
              query: gqlGetPost,
              data: dataPosts,
            });
          },
          // optimistic response ensures data is added immediately
          // as we specified for the updated function
          optimisticResponse: {
            __typename: ' Mutation',
            addPost: {
              __typename: 'Post',
              _id: -1,
              ...payload,
            },
          },
        });

        if (!errors) {
          console.log(data);
          // @ts-ignore
          resolve(data);
        }
      } catch (error) {
        console.error('entra');
        reject(error);
      } finally {
        context.dispatch('ACT_LOADING_POST', false);
        context.commit('stopProcessing', null, { root: true });
      }
    });
  },
};
