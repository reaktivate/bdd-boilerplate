import { client } from '../lib/api/api-client';
import { makeAutoObservable, reaction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import GlobalStore from '@wf/next/src/stores/GlobalStore';

interface User {
  id: string;
}

class UserStore {
  readonly globalStore: GlobalStore;
  status = {
    loading: 'idle',
    errorText: '',
  };

  session: string | null = null;

  me: User | undefined | null = undefined; // undefined = never loaded, null = no user,

  constructor(globalStore: GlobalStore) {
    this.globalStore = globalStore;
    makeAutoObservable(this, {}, { autoBind: true });

    if (typeof window !== 'undefined') {
      makePersistable(
        this,
        {
          name: 'userStore',
          properties: ['session'],
          storage: window.localStorage,
        },
        { delay: 100, fireImmediately: true }
      );
    }

    // check authentication
    reaction(() => {
      return { route: this.globalStore.uiStore.route, session: this.session };
    }, this._checkAuthentication);
  }

  async _checkAuthentication({ session, route }) {
    if (!route) {
      // this is initial call, skip check
      return;
    }
    //console.log('CP', session, route);
    if (typeof this.me === 'undefined') {
      if (!session) {
        this.me = null;
        if (route.startsWith('/admin')) {
          this.globalStore.uiStore.setRoute('/auth/login');
        }
      } else {
        try {
          await this.checkMe();
        } catch (e) {
          this.logout();
          if (route.startsWith('/admin')) {
            this.globalStore.uiStore.setRoute('/auth/login');
          }
        }
      }
    }
  }

  hydrate(data: Partial<UserStore>) {
    for (const dataKey in data) {
      this[dataKey] = data[dataKey];
    }
  }

  setSession(s: string) {
    console.log('SESSION', s);
    this.session = s;
  }

  async login(email: string, password: string) {
    const data = {
      username: email,
      password,
    };
    const answer: any = await client().post('/auth/login', data);
    if (answer.session) {
      this.session = answer.session;
      this.me = answer.user;
    } else {
      throw new Error('Unauthorized');
    }
  }

  async checkMe() {
    if (!this.me) {
      const answer: any = await client().get('/auth/me');
      if (answer.session) {
        this.session = answer.session;
        this.me = answer.user;
      } else {
        throw new Error('Unauthorized');
      }
    }
  }

  logout() {
    // localStorage.removeItem('token');
    // sessionStorage.removeItem('token');
    this.me = null;
    this.session = null;
  }

  async changePassword(values) {
    await client().put('/user/change-password', values);
  }
}

export default UserStore;
