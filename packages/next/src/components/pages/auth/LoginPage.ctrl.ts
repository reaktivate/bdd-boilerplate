import { makeAutoObservable, runInAction } from 'mobx';
import { getGlobalStore } from '../../../stores/GlobalStateProvider';
import StateMachine, { IStateMachine } from '../../../lib/fsm/app';

export interface ICredentials {
  email: string;
  password: string;
}

export const DEFINITION = {
  states: ['idle', 'login_succeeded', 'login_failed'],
  transitions: [
    { name: 'init', from: 'none', to: 'idle' },
    { name: 'login_succeeded', from: ['idle', 'error'], to: 'logged_in' },
    { name: 'login_failed', from: ['idle', 'error'], to: 'error' },
  ],
};

export class LoginController {
  readonly globalStore = getGlobalStore();
  fsm: IStateMachine;
  values: ICredentials;
  error: string;

  constructor() {
    makeAutoObservable(this);
    this.fsm = new StateMachine(DEFINITION);
    this.fsm.fire('init');
    // console.log(plugins.visualize(this.fsm));
  }

  setValues(values: ICredentials) {
    runInAction(() => {
      this.values = values;
    });
  }

  async doLogin(values: ICredentials) {
    this.values = values;
    try {
      await this.globalStore.userStore.login(values.email, values.password);
      this.error = '';
      this.fsm.fire('login_succeeded');
      this.globalStore.uiStore.setRoute('/admin');
    } catch (e) {
      console.log('Error logging in', e);
      this.fsm.fire('login_failed');
      this.error = 'Incorrect';
    }
  }
}
