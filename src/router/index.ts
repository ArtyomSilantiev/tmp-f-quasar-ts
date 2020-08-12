import { route } from 'quasar/wrappers'
import VueRouter, { Route } from 'vue-router'
import routes from './routes'
import GuardWrapper, { IMiddlewareContext } from './guards/guard_wrapper';

export interface Breadcrumb {
  name: string;
  to?: {
    path?: string,
    name?: string,
    _params?: string[],
    params?: {[paramKey: string]: string}
  }
}
export interface AppRoute extends Route {
  meta?: {
    guards?: GuardWrapper[];
    breadcrumbs?: Breadcrumb[];
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

let routerInstance: VueRouter;

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
    const allGuards = [];
    for (const math of to.matched) {
      if (!math.meta || !math.meta.guards) {
        continue;
      }
      for (const gurad of math.meta.guards) {
        allGuards.push(gurad);
      }
    }

    if (allGuards.length === 0) {
      return next();
    }
    const context = {
      to,
      from,
      next
    };
    return allGuards[0].middleware({
      ...context,
      next: guardsPipeline(context, allGuards, 1)
    });
  });

  routerInstance = Router;

  return Router;
});

export { routerInstance };

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
