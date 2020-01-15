import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Component from 'vue-class-component';

Component.registerHooks(['apollo']);

import {apolloProvider} from './plugins/graphql';

Vue.config.productionTip = false;



new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
