/* eslint-disable import/no-cycle */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { AuthGuard } from './AuthGuard';
import AddPostComponent from '../components/Post/AddPost.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '../components/Post/Posts.vue'),
  },
  {
    path: '/post/:postId',
    name: 'post',
    component: () => import(/* webpackChunkName: "posts" */ '../components/Post/Post.vue'),
    props: true,
  },
  {
    path: '/posts/add',
    name: 'addPost',
    component: AddPostComponent,
    // beforeEnter: AuthGuard,
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../components/Auth/Profile.vue'),
    // Control de rutas se puede poner en el componente
    beforeEnter: AuthGuard,
  },
  {
    path: '/signin',
    name: 'signIn',
    component: () => import(/* webpackChunkName: "signIn" */ '../components/Auth/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'signUp',
    component: () => import(/* webpackChunkName: "signUp" */ '../components/Auth/SignUp.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
