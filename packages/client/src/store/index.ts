import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState, ErrorObject } from './types';
import { postsModule } from './modules/posts';
import { todoModule } from './modules/todo/index';

Vue.use(Vuex);

const rootStore: StoreOptions<RootState> = {
  state: {
    processing: false,
    error: {
      isError: false,
      message: '',
    },
  },
  getters: {
    processing: (state: RootState) => state.processing,
    getError: (state: RootState) => state.error,
  },
  mutations: {
    startProcesing(state: RootState) {
      state.processing = true;
    },
    stopProcesing(state: RootState) {
      state.processing = false;
    },
    setError(state: RootState, payload: ErrorObject) {
      // TODO Refinar los mensajes de errores, sobre todo que tipos van a llegar
      state.error = {
        isError: payload.isError,
        message: payload.message,
      };
      setTimeout(() => {
        state.error = {
          isError: false,
          message: '',
        };
      }, 5000);
    },
  },
  actions: {
  },
  modules: {
    postsModule,
  },
};

export const store = new Vuex.Store<RootState>(rootStore);
