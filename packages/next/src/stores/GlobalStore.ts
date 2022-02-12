import { configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import UiStore from './uiStore';
import UserStore from './userStore';
import config from '../lib/config';
import BooksStore from '@wf/next/src/stores/booksStore';

enableStaticRendering(config().isServer);
// https://mobx.js.org/configuration.html#configuration-
configure({
  enforceActions: 'never',
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: false,
});

export default class GlobalStore {
  readonly uiStore: UiStore;
  readonly userStore: UserStore;
  readonly booksStore: BooksStore;

  constructor() {
    this.uiStore = new UiStore(this);
    this.userStore = new UserStore(this);
    this.booksStore = new BooksStore(this);
  }

  async hydrate(initialState?: Partial<GlobalStore>) {
    if (initialState?.userStore) this.userStore.hydrate(initialState?.userStore);
    if (initialState?.uiStore) this.uiStore.hydrate(initialState?.uiStore);
    // this.exampleStore.hydrate(initialState.exampleStore);
  }
}
