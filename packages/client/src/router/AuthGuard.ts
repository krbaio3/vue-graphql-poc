/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { Route } from 'vue-router';
import { store } from '../store';

export const AuthGuard = (to: Route, from: Route, next: any) => {
  if (store.state.user.username === '' || store.state.user == null) {
    next({
      path: '/signin',
    });
  } else {
    next();
  }
};
