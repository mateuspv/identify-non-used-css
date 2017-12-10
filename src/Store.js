import {set, conj, union, difference , toJs} from 'mori';

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

  toString() {
    return `
      found: ${this.compute().found}
      not found: ${this.compute().notFound}
      `
  }

  static merge(S1, S2) {
      // Takes all selectors not found on S2 and  return those who are not used on S1.
      const notFoundOnS2 = difference(S2._notFound, S1._found);
      // Takes all selectors not found on S1 and  return those who are not used S2.
      const notFoundOnS1   = difference(S1._notFound, S2._found);

      const notFound = union(notFoundOnS1, notFoundOnS2);

    return {
      found: toJs(union(S1._found, S2._found)),
      notFound: toJs(notFound)
    }
  }
}