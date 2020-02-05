import Vue from 'vue';
import { ActionContext, ActionTree } from 'vuex';
import { AuthState, QueryGetAuth } from './types';
import { RootState } from '@/store/types';

import { defaultClient as apolloClient } from '@/plugins/graphql';
import { ApolloQueryResult, FetchResult } from 'apollo-boost';
import gqlSignInUser from '@/components/Auth/queries/SignInUser.graphql';
import gqlSignUpUser from '@/components/Auth/queries/SignUpUser.graphql';
import { SignInUser } from './types';
import { router } from '@/router';
import { User } from '../../types';


type AuthActionContext = ActionContext<AuthState, RootState>;
type AuthActionTree = ActionTree<AuthState, RootState>;

export const actions: AuthActionTree = {
  // Se puede usar sin el async/await
  async ACT_SIGN_IN_USER(context: AuthActionContext, payload: SignInUser): Promise<any> {
    try {
      context.commit('startProcessing', null, { root: true });
      // Use ApolloCLient to fire getPosts query
      const { data, errors } =
        await apolloClient.mutate({
          mutation: gqlSignInUser,
          variables: payload,
        });
      if (!errors) {
        context.commit('SET_TOKEN', data.signInUser.token);
        // to make sure created method is run in main.js (we run getCurrentUser), reload the page
        // router.push({ path: '/' });
        // If change router.go TO router.push, not refresh the page
        router.go(0);
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
      context.commit('setError', e, { root: true });
    } finally {
      context.commit('stopProcessing', null, { root: true });
    }
  },
  async ACT_SIGN_OUT(context: AuthActionContext, payload: any): Promise<any> {
    // clear user in the state
    const clearUser: User = {
      username: '',
      avatar: '',
      email: '',
      favorites: [],
      joinDate: '',
      password: '',
    };
    context.commit('setCurrentUser', null, { root: true });
    // remove the token in localStorage
    localStorage.setItem('token', '');
    // end Session
    // console.dir(apolloClient);
    await apolloClient.resetStore();
    // redirect home - kick users out of private pages (i.e. profile)
    router.push({ path: '/' });
    // router.go(0);
  },
  async ACT_SIGN_UP_USER(context: AuthActionContext, payload: SignInUser): Promise<any> {
    try {
      context.commit('startProcessing', null, { root: true });
      // Use ApolloCLient to fire getPosts query
      const { data, errors } =
        await apolloClient.mutate({
          mutation: gqlSignUpUser,
          variables: payload,
        });
      if (!errors) {
      // if (true) {
      //   const data = {
      //     signInUser: {
      // tslint:disable-next-line:max-line-length
      //       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpb25pIiwiZW1haWwiOiJkaW9uaUBxd2VydHkuY29tIiwiaWF0IjoxNTgwODQ5NDk4LCJleHAiOjE1ODA4NTMwOTh9.4JrTkcKBvVyKA6SkUEqig9Ol66U8EkokKuUk1KmQfng',
      //     },
      //   };
        context.commit('SET_TOKEN', data.signInUser.token);
        // to make sure created method is run in main.js (we run getCurrentUser), reload the page
        // router.push({ path: '/' });
        router.go(0);
        // If change router.go TO router.push, not refresh the page
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
      context.commit('setError', e, { root: true });
    } finally {
      context.commit('stopProcessing', null, { root: true });
    }
  },
};
