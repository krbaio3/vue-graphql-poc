import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';


Vue.use(Vuetify);

export default new Vuetify({
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
