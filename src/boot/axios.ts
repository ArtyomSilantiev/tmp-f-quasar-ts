import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import AuthStorage from '@/storages/auth';
import { Dialog } from 'quasar';
import { routerInstance } from '@/router';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue }) => {
  axios.interceptors.request.use(request => {
    const token = AuthStorage.getToken();
    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`;
    }
    return request;
  });

  axios.interceptors.response.use(response => response, error => {
    const { status, data } = error.response;

    if (status >= 500) {
      Dialog.create({
        title: 'Ошибка',
        message: 'Произошла ошибка. (Стус >= 500)'
      });
    } else if (status === 401 && AuthStorage.isAuthAndLoad()) {
      AuthStorage.clearToken();
      Dialog.create({
        title: 'Ошибка',
        message: 'Вы больше не авторизированный пользователь.'
      }).onDismiss(() => {
        routerInstance.push({ path: '/' });
      });
    }

    return Promise.reject(error);
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
});
