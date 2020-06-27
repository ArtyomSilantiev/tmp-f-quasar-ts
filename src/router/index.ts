import { route } from 'quasar/wrappers'
import VueRouter, { Route } from 'vue-router'
import routes from './routes'
import GuardWrapper, { IMiddlewareContext } from './guards/GuardWrapper';

export interface AppRoute extends Route {
  meta?: {
    guards?: GuardWrapper[];
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route(function ({ Vue }) {
  Vue.use(VueRouter)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to: AppRoute, from: AppRoute, next: () => void) => {
    if (!to.meta || !to.meta.guards) {
      return next();
    }
    const guards = to.meta.guards;
    const context = {
      to,
      from,
      next
    };
    return guards[0].middleware({
      ...context,
      next: guardsPipeline(context, guards, 1)
    });
  });

  return Router
});

function guardsPipeline (
  context: IMiddlewareContext,
  guards: GuardWrapper[],
  index: number
) {
  if (!guards || !guards[index]) {
    return context.next;
  }
  const nextMiddleware = guards[index].middleware;
  return () => {
    const nextPipeline = guardsPipeline(context, guards, index + 1);
    nextMiddleware({ ...context, next: nextPipeline });
  };
}
