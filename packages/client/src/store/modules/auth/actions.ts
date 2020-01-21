import Vue from 'vue';
import { ActionContext, ActionTree } from 'vuex';
import { AuthState, QueryGetAuth } from './types';
import { RootState } from '@/store/types';

import { defaultClient as apolloClient } from '@/plugins/graphql';
import { ApolloQueryResult, FetchResult } from 'apollo-boost';
import gqlSignInUser from '@/components/Auth/queries/SignInUser.graphql';
import gqlSignUpUser from '@/components/Auth/queries/SignUpUser.graphql';
import { SignInUser } from './types';


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
        // tslint:disable-next-line: no-console
        console.log(data.signInUser.token);
        context.commit('SET_TOKEN', data.signInUser.token);
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
