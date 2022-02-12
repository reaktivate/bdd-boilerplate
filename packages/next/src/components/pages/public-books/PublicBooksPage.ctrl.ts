import { makeAutoObservable, runInAction } from 'mobx';
import { getGlobalStore } from '../../../stores/GlobalStateProvider';

export class BooksController {
  readonly globalStore = getGlobalStore();
  filterByName: string = ''; // it's important to initialize - otherwise the computed will fail to react

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setFilter(filter) {
    this.filterByName = filter;
  }

  get visibleBooks() {
    const all = this.globalStore.booksStore.publicBooks;
    if (!this.filterByName) {
      return all;
    }
    return all.filter((book) => book.name.toLowerCase().includes(this.filterByName));
  }
}
