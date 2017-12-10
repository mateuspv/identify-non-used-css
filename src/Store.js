import {set, conj, union, toJs} from 'mori';

export default class Store {
  constructor() {
    this._found = set();
    this._notFound = set();
  }

  
  found(selector) {
    this._found = conj(this._found, selector);
  }

  notFound(selector) {
    return this._notFound = conj(this._notFound, selector);
  }

  compute() {
    return  {
      found: toJs(this._found),
      notFound: toJs(this._notFound)
    }
  }
}