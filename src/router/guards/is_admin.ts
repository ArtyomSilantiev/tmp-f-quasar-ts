import GuardWrapper from './guard_wrapper';
import AuthStorage from '@/storages/auth';
import { UserRole } from '@/models/User';

export default new GuardWrapper(function ({ next }) {
  const user = AuthStorage.getUser();

  if (user && user.role === UserRole.Admin) {
    next();
  } else {
    next({ path: '/auth/login' });
  }
});
