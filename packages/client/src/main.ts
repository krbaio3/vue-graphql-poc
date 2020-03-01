import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import { store } from './store';
import vuetify from './plugins/vuetify';
import { apolloProvider } from './plugins/graphql';
import '@/plugins/vue-rx';
import '@/utils/date.filter';
// import '@/utils/infiniteScroll';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: (h) => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch('currentUser');
  },
}).$mount('#app');
