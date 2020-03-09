/* eslint-disable import/no-cycle */
import { Module } from 'vuex';
import { RootState } from '../../types';
import { actions } from './actions';
import { AuthState } from './types';
import { state } from './state';
import { mutations } from './mutations';
import { getters } from './getters';

const namespaced = true;

type AuthModule = Module<AuthState, RootState>;

export const authModule: AuthModule = {
  namespaced,
  getters,
  mutations,
  state,
  actions,
};
