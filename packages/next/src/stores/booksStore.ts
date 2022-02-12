import { makeAutoObservable, reaction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import GlobalStore from '@wf/next/src/stores/GlobalStore';

class BooksStore {
  readonly globalStore: GlobalStore;

  publicBooks: any[] = [];

  constructor(globalStore: GlobalStore) {
    this.globalStore = globalStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setBooks(books: any[]) {
    this.publicBooks = books;
  }
}

export default BooksStore;
