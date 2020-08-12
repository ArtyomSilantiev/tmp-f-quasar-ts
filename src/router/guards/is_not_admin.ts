import GuardWrapper from '@/router/guards/guard_wrapper';
import AuthStorage from '@/storages/auth';
import { UserRole } from '@/models/User';

export default new GuardWrapper(({ next }) => {
  const user = AuthStorage.getUser();

  if (user && user.role === UserRole.Admin) {
    next({ path: '/' });
  } else {
    next();
  }
});
