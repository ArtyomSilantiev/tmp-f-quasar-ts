import { RouteConfig } from 'vue-router';
import IsAdminGuard from './guards/is_admin';
import IsNotAdminGuard from './guards/is_not_admin';

import MainLayout from '@/layouts/MainLayout.vue';
import BlankLayout from '@/layouts/BlankLayout.vue';

import BasePage from '@/pages/BasePage.vue';
import UserPage from '@/pages/UserPage.vue';
import AuthLogout from '@/pages/Logout.vue';
import AuthLogin from '@/pages/Login.vue';
import Error404 from '@/pages/Error404.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: BasePage,
        meta: {
          breadcrumbs: [
            'Главная'
          ]
        }
      }, {
        path: 'user',
        component: UserPage,
        meta: {
          breadcrumbs: [
            { name: 'Главная', to: { path: '/' } },
            { name: 'Пользователь' }
          ]
        }
      }, {
        path: 'logout',
        component: AuthLogout
      }
    ],
    meta: {
      guards: [IsAdminGuard]
    }
  },

  {
    path: '/auth',
    component: BlankLayout,
    children: [{
      path: 'login',
      component: AuthLogin
    }],
    meta: {
      guards: [IsNotAdminGuard]
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: Error404
  }
]

export default routes
