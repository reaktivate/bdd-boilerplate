import { ADD_NOTIFICATION, publish } from '../lib/utils/eventBus';
import { makeAutoObservable } from 'mobx';
import GlobalStore from './GlobalStore';
import Router, { SingletonRouter } from 'next/router';
import config from '../lib/config';

interface IListActionDescriptor {
  action: string;
  parameters: any;
  refetch?: any;
}

class UiStore {
  readonly router: SingletonRouter = Router;
  readonly globalStore: GlobalStore;

  route: string = '';
  history: string[] = [];

  notifications: any[] = [];

  _displayedUids: any[] = [];

  toastType: string | null = null;

  toastMesssage: string = '';

  constructor(globalStore: GlobalStore) {
    this.globalStore = globalStore;
    makeAutoObservable(this);
  }

  initRoute(route:string) {
    this.route = route;
  }

  hydrate(data: Partial<UiStore>){
    for (const dataKey in data) {
      this[dataKey] = data[dataKey];
    }
  }

  setRoute(route: string) {
    this.route = route;
    this.history.push(route);
    if (typeof window !== 'undefined' && !config().isTest) {
      // window.location.href = route;
      this.router.push(route);
    }
  }


  addNotification = (
    level: string = 'warning',
    title: string = '',
    message: string,
    position = 'tr',
    autoDismiss = 3
  ) => {
    const uid = new Date().getTime().toString();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const shownNow = this.PendingNotifications;
    const existing = shownNow.filter((notif: any) => notif.message === message);
    if (existing && existing.length) {
      return;
    }
    this.toastType = level;
    this.toastMesssage = message;

    publish(ADD_NOTIFICATION, {
      uid,
      title,
      message,
      level,
      position,
      autoDismiss,
    });

    self.notifications.unshift({
      uid,
      title,
      message,
      level,
      position,
      autoDismiss,
      added: new Date().getTime(),
      onAdd: (n: any) => {
        const count = self.notifications.length || 0;
        self._displayedUids.unshift(n.uid);

        if (count > 30) {
          self.notifications.pop();
          self._displayedUids.pop();
        }
      },
    });
  };

  hideNotification(notification: any) {
    this._displayedUids = this._displayedUids.filter((n) => n != notification.uid);
    this.notifications = this.notifications.filter((notif) => notif.uid !== notification.uid);
  }

  get PendingNotifications(): any {
    return this.notifications.filter((notif) => {
      return !this._displayedUids.includes(notif.uid);
    });
  }
}

export default UiStore;
