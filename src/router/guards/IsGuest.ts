import GuardWrapper from './GuardWrapper';
import AuthStorage from '@/storages/Auth';

export default new GuardWrapper(function ({ next }) {
  const token = AuthStorage.getToken();

  if (!token) {
    next();
  } else {
    next({ path: '' });
  }
});
