/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { defaultClient as apolloClient } from '@/plugins/graphql';
import { postModule } from '@/store/modules/posts';
import { authModule } from '@/store/modules/auth';
import { vuexPersistence } from '@/plugins/vuex-persist';
import gqlGetCurrentUser from '@/queries/GetCurrentUser.graphql';
import { RootState, ErrorObject, User } from '@/store/types';
// import { todoModule } from './modules/todo/index';
import { Post } from './modules/posts/types';

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
      _id: '',
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
    getCurrentUser: (state: RootState): User => state.user,
    getUserFavorites: (state: RootState): Post[] => state.user && state.user.favorites,
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
    currentUser({ commit }) {
      commit('startProcessing');
      apolloClient.query({
        query: gqlGetCurrentUser,
      }).then(({ data }) => {
        commit('setCurrentUser', data.getCurrentUser);
        // Hacer el redirect aqui o en el componente
      })
        .catch((error) => {
          Vue.prototype.$log.error(error);
        })
        .finally(() => {
          commit('stopProcessing');
        });
    },
  },
  modules: {
    postModule,
    authModule,
  },
  plugins: [vuexPersistence.plugin],
};

export const store = new Vuex.Store<RootState>(rootStore);
