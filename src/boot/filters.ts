import { date } from 'quasar';
import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
  Vue.filter('date', (value: string, format?: string) => {
    return date.formatDate(value, format || 'YYYY-MM-DD HH:mm:ss')
  });
});
