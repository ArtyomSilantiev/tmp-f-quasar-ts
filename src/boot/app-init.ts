import { boot } from 'quasar/wrappers';
import AuthStorage from '@/storages/auth';

export default boot(async ({ Vue }) => {
  await AuthStorage.init();
});
