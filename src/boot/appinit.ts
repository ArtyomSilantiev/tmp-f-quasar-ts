import { boot } from 'quasar/wrappers';
import AuthStorage from '../storages/Auth';

export default boot(() => {
  AuthStorage.init();
});
