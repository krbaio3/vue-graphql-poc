import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AddPost from '@/components/Post/AddPost.vue';
import Posts from '@/components/Post/Posts.vue';
import Profile from '@/components/Auth/Profile.vue';
import SignIn from '@/components/Auth/SignIn.vue';
import SignUp from '@/components/Auth/SignUp.vue';

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
    component: Posts,
  },
  {
    path: '/posts/add',
    name: 'addPost',
    component: AddPost,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/signin',
    name: 'signIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUp,
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
