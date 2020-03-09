/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
import Vue from 'vue';
import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { defaultClient as apolloClient } from '@/plugins/graphql';
import { ApolloQueryResult } from 'apollo-boost';
import gqlGetPost from '@/components/Post/queries/GetPosts.graphql';
import gqlAddPost from '@/components/Post/queries/AddPosts.graphql';
import gqlSearchPost from '@/components/Post/queries/SearchPost.graphql';
import gqlGetUserPost from '@/components/Post/queries/GetUserPost.graphql';
import gqlUpdateUserPost from '@/components/Post/queries/UpdateUserPost.graphql';
import gqlDeleteUserPost from '@/components/Post/queries/DeleteUserPost.graphql';
import gqlInfiniteScrollPosts from '@/components/Post/queries/InfiniteScrollPosts.graphql';
import { GraphQLError } from 'graphql';
import {
  PostsState, QueryGetPosts, AddPost, Post, MyPost,
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
      Vue.prototype.$log.error(e);
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
            Vue.prototype.$log.error(error);
            context.commit('setError', error, { root: true });
            reject(error);
          });
      } catch (error) {
        Vue.prototype.$log.error(error);
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
            // first read the query you want to update
            const dataPosts: cacheReadQuery = cache.readQuery({ query: gqlGetPost });
            // crete updated data
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
          // Rerun specific queries after performing the mutatuon in order to get fresh data
          refetchQueries: [
            {
              query: gqlInfiniteScrollPosts,
              variables: {
                // TODO: pasar valores a constantes para centralizar
                pageNum: 1,
                pageSize: 2,
              },
            },
          ],
        });

        if (!errors) {
          // @ts-ignore
          resolve(data);
        }
      } catch (error) {
        reject(error);
      } finally {
        context.dispatch('ACT_LOADING_POST', false);
        context.commit('stopProcessing', null, { root: true });
      }
    });
  },
  ACT_USER_POSTS(context: PostsActionContext, payload: string): Promise<Post[] | []> {
    return new Promise((resolve, reject) => {
      try {
        context.commit('startProcessing', null, { root: true });
        const variables = { userId: payload };
        apolloClient.query({
          query: gqlGetUserPost,
          variables,
        }).then(({ data }) => {
          context.commit('SET_USER_POST', data.getUserPosts);
          resolve(data.getUserPosts);
        }).catch((error) => {
          Vue.prototype.$log.error(error);
          // set error
          reject(error);
        });
      } catch (error) {
        // set error
        reject(error);
      } finally {
        context.commit('stopProcessing', null, { root: true });
      }
    });
  },
  ACT_UPDATE_USER_POST(context: PostsActionContext, payload: Partial<MyPost>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        context.commit('startProcessing', null, { root: true });
        apolloClient.mutate({
          mutation: gqlUpdateUserPost,
          variables: payload,
        })
          .then(({ data }) => {
            // buscamos el indice del objeto post actualizado
            const index = context.state.userPost.findIndex(
              // eslint-disable-next-line no-underscore-dangle
              (post) => post._id === data.updateUserPost._id,
            );
            const userPosts = [
              ...context.state.userPost.slice(0, index),
              data.updateUserPost,
              ...context.state.userPost.slice(index + 1),
            ];
            context.commit('SET_USER_POST', userPosts);
            resolve(true);
          })
          .catch((error) => Vue.prototype.$log.error(error));
      } catch (error) {
        reject(error);
      } finally {
        context.commit('stopProcessing', null, { root: true });
      }
    });
  },
  ACT_DELETE_USER_POST(context: PostsActionContext, payload: string): Promise<Post> {
    return new Promise<Post>(async (resolve, reject) => {
      try {
        const variables = { postId: payload };
        // TODO Poner loading
        await apolloClient.mutate({
          mutation: gqlDeleteUserPost,
          variables,
        }).then(({ data }) => {
          // buscamos el indice del objeto post actualizado
          const index = context.state.userPost.findIndex(
            // eslint-disable-next-line no-underscore-dangle
            (post) => post._id === data.deleteUserPost._id,
          );
          const userPosts = [
            ...context.state.userPost.slice(0, index),
            ...context.state.userPost.slice(index + 1),
          ];
          context.commit('SET_USER_POST', userPosts);
          resolve(data.deleteUserPost);
        })
          .catch((error) => reject(error));
      } catch (error) {
        // TODO: Setear el error
        reject(error);
      } finally {
        // TODO Quitar loading
      }
    });
  },
};
