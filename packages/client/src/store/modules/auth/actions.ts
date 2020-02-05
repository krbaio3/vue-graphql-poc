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
      // context.commit('startProcessing', null, { root: true });
      context.commit('SET_LOADING_BTN', true);
      // Use ApolloCLient to fire getPosts query
      const { data, errors } =
        await apolloClient.mutate({
          mutation: gqlSignInUser,
          variables: payload,
        });
      if (!errors) {
        context.commit('SET_TOKEN', data.signInUser.token);
        // await context.dispatch('currentUser', null, { root: true });
        // to make sure created method is run in main.js (we run getCurrentUser), reload the page
        // router.push({ path: '/' });
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
      context.commit('setError', e, { root: true });
    } finally {
      context.commit('SET_LOADING_BTN', false);
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
    // tslint:disable-next-line:no-empty
    // router.push('/', () => { });
    router.push({ path: '/' });
  },
  async ACT_SIGN_UP(context: AuthActionContext, payload: any): Promise<any> {
    try {
      // context.commit('startProcessing', null, { root: true });
      context.commit('startProcessing', null, { root: true });
      // Use ApolloCLient to fire getPosts query
      const { data, errors } =
        await apolloClient.mutate({
          mutation: gqlSignUpUser,
          variables: payload,
        });
      if (!errors) {
        context.commit('SET_TOKEN', data.signUpUser.token);
        // await context.dispatch('currentUser', null, { root: true });
        // to make sure created method is run in main.js (we run getCurrentUser), reload the page
        router.push({ path: '/' });
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
