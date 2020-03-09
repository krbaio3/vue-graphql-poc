import Vue from 'vue';
import moment from 'moment';

moment.locale('es');
Vue.filter('formatDate', (value: string) => {
  if (value) {
    return moment(value, 'x').format('DD/MM/YYYY HH:mm');
  }
  return 'Error to convert date';
});
