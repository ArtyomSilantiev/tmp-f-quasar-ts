import GuardWrapper from './guard_wrapper';
import AuthStorage from '@/storages/auth';

export default new GuardWrapper(function ({ next }) {
  const token = AuthStorage.getToken();

  if (!token) {
    next();
  } else {
    next({ path: '' });
  }
});
