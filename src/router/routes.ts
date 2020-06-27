import { RouteConfig } from 'vue-router'
import IsAuthGuard from './guards/IsAuth';

function layout (name: string) {
  return import('layouts/' + name);
}

function page (name: string) {
  return import('pages/' + name);
}

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => layout('MainLayout.vue'),
    children: [
      { path: '', component: () => page('Index.vue') },
      { path: 'test', component: () => page('Page.vue'), meta: { name: 'test' } },
      { path: 'guarded', component: () => page('Page.vue'), meta: { name: 'guarded', guards: [IsAuthGuard] } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => page('Error404.vue')
  }
]

export default routes
