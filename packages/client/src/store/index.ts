// tslint:disable: no-console
import Vue from 'vue';
import Vuex, { StoreOptions, ActionContext } from 'vuex';
import { RootState, ErrorObject, User } from './types';
import { postsModule } from './modules/posts';
// import { todoModule } from './modules/todo/index';
import { authModule } from './modules/auth/index';
import { defaultClient as apolloClient } from '@/plugins/graphql';
import gqlGetCurrentUser from '@/queries/GetCurrentUser.graphql';

Vue.use(Vuex);

const rootStore: StoreOptions<RootState> = {
  state: {
    processing: false,
    error: {
      isError: false,
      message: '',
    },
    user: {
      username: '',
      // __typename: '',
      // _id: '',
      avatar: '',
      email: '',
      favorites: [],
      joinDate: '',
      password: '',
    },
  },
  getters: {
    processing: (state: RootState) => state.processing,
    getError: (state: RootState) => state.error,
    getCurrentUser: (state: RootState) => state.user,
  },
  mutations: {
    startProcessing(state: RootState) {
      state.processing = true;
    },
    stopProcessing(state: RootState) {
      state.processing = false;
    },
    setError(state: RootState, payload: ErrorObject) {
      // TODO Refinar los mensajes de errores, sobre todo que tipos van a llegar
      state.error = {
        isError: true,
        message: payload.message,
      };
      setTimeout(() => {
        state.error = {
          isError: false,
          message: '',
        };
      }, 5000);
    },
    setCurrentUser(state: RootState, payload: User) {
      state.user = payload;
    },
  },
  actions: {
    currentUser({ commit }, payload: User) {
      commit('startProcessing');
      apolloClient.query({
        query: gqlGetCurrentUser,
      }).then(({ data }) => {
        // debugger;
        commit('setCurrentUser', data.getCurrentUser);
        // Hacer el redirect aqui o en el componente
        console.log(data.getCurrentUser);
      })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          commit('stopProcessing');
        });
    },
  },
  modules: {
    postsModule,
    authModule,
  },
};

export const store = new Vuex.Store<RootState>(rootStore);
