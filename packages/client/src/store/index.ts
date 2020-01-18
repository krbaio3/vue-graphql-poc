import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { postsModule } from './modules/posts';
// import { todoModule } from './modules/todo/index';

Vue.use(Vuex);

const rootStore: StoreOptions<RootState> = {
  state: {
    processing: false,
  },
  getters: {
    processing: (state: RootState) => state.processing,
  },
  mutations: {
    startProcesing(state: RootState) {
      state.processing = true;
    },
    stopProcesing(state: RootState) {
      state.processing = false;
    },
  },
  actions: {
  },
  modules: {
    postsModule,
  },
};

export const store = new Vuex.Store<RootState>(rootStore);
