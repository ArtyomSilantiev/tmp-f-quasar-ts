import Vue from 'vue';
import { Cookies } from 'quasar'

class AuthStorage {
  private state = <{
    token: string | null;
  }>Vue.observable({
    token: null
  });

  public init () {
    this.state.token = Cookies.get('token');
  }

  public getToken () {
    return this.state.token;
  }

  public setToken (token: string) {
    this.state.token = token;
    Cookies.set('token', token, { expires: 365 });
  }

  public clearToken () {
    this.state.token = null;
    Cookies.remove('token');
  }
}

export default new AuthStorage();
