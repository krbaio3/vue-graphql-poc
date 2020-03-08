/* eslint-disable import/no-cycle */
import Vue from 'vue';
import { ActionContext, ActionTree } from 'vuex';
import { defaultClient as apolloClient } from '@/plugins/graphql';
import { router } from '@/router';
import { RootState } from '@/store/types';
import gqlSignInUser from '@/components/Auth/queries/SignInUser.graphql';
import gqlSignUpUser from '@/components/Auth/queries/SignUpUser.graphql';
import { AuthState, SignInUser } from './types';


type AuthActionContext = ActionContext<AuthState, RootState>;
type AuthActionTree = ActionTree<AuthState, RootState>;

export const actions: AuthActionTree = {
  // Se puede usar sin el async/await
  ACT_SIGN_IN_USER(context: AuthActionContext,
    payload: SignInUser): Promise<boolean | Error> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        // context.commit('startProcessing', null, { root: true });
        context.commit('SET_LOADING_BTN', true);
        // Use ApolloCLient to fire getPosts query
        const { data, errors } = await apolloClient.mutate({
          mutation: gqlSignInUser,
          variables: payload,
        });
        if (!errors) {
          context.commit('SET_TOKEN', data.signInUser.token);
          // await context.dispatch('currentUser', null, { root: true });
          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          // router.push({ path: '/' });
          // If change router.go TO router.push, not refresh the page
          router.go(0);
          resolve(true);
        }
      } catch (e) {
        // tslint:disable-next-line:no-console
        Vue.prototype.$log.error(e);
        context.commit('setError', e, { root: true });
        reject(e);
      } finally {
        context.commit('SET_LOADING_BTN', false);
      }
    });
  },
  async ACT_SIGN_OUT(context: AuthActionContext): Promise<void> {
    // clear user in the state
    // const clearUser: User = {
    //   _id: '',
    //   username: '',
    //   avatar: '',
    //   email: '',
    //   favorites: [],
    //   joinDate: '',
    //   password: '',
    // };
    context.commit('setCurrentUser', null, { root: true });
    // remove the token in localStorage
    localStorage.setItem('token', '');
    // end Session
    await apolloClient.resetStore();
    // redirect home - kick users out of private pages (i.e. profile)
    router.push({ path: '/' });
    // router.go(0);
  },
  async ACT_SIGN_UP_USER(context: AuthActionContext, payload: SignInUser): Promise<void> {
    try {
      context.commit('startProcessing', null, { root: true });
      context.commit('SET_LOADING_BTN', true);
      // Use ApolloCLient to fire getPosts query
      const { data, errors } = await apolloClient.mutate({
        mutation: gqlSignUpUser,
        variables: payload,
      });
      if (!errors) {
        context.commit('SET_TOKEN', data.signUpUser.token);
        // to make sure created method is run in main.js (we run getCurrentUser), reload the page
        // TODO esto es una chapuza, buscar otra solucion
        router.push({ path: '/' });
        router.go(0);
        // If change router.go TO router.push, not refresh the page
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      Vue.prototype.$log.error(e);
      context.commit('setError', e, { root: true });
    } finally {
      context.commit('SET_LOADING_BTN', false);
      context.commit('stopProcessing', null, { root: true });
    }
  },
};
