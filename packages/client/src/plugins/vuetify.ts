import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    themes: {
      light: {
        primary: colors.deepPurple.base,
        secondary: colors.purple.base,
        accent: colors.orange.base,
        error: colors.deepOrange.base,
        warning: colors.amber.base,
        info: colors.lightBlue.base,
        success: colors.lightGreen.base,
      }
      ,
    },
  },
});
