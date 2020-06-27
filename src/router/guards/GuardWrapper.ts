import { Route, Location } from 'vue-router';

export interface IMiddlewareContext {
  to: Route,
  from: Route,
  next: (loc?: Location) => void
}

export interface IMiddleware {
    (context: IMiddlewareContext): void;
}

export default class GuardWrapper {
  public middleware: IMiddleware;

  constructor (middleware: IMiddleware) {
    this.middleware = middleware;
  }
}
