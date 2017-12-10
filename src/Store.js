import {set, conj, union, difference , toJs} from 'mori';

/**
 * Store: A place for saves all used and non used selectors
 */
export default class Store {
  constructor(used, nonUsed) {
    this._found = set(used);
    this._notFound = set(nonUsed);
  }

  /**
   * Adds a selector to a found list
   * @param  {String} selector
   */
  found(selector) {
    this._found = conj(this._found, selector);
  }

  /**
   * Adds a selector to notFound list
   * @param  {String} selector
   */
  notFound(selector) {
    return this._notFound = conj(this._notFound, selector);
  }

  /**
   * compose the used and nonUsed selectors
   * @return {Object}
   */
  compute() {
    return  {
      found: toJs(this._found),
      notFound: toJs(this._notFound)
    }
  }

  /**
   * Simple log 
   * @return {String}
   */
  toString() {
    return `
      found: ${this.compute().found}
      not found: ${this.compute().notFound}
      `
  }

  /**
   * merge two Stores
   *  - merge all found selectors
   *  - merge all selectors not used on both stores,
   *    if some selector is not used on StoreA, but is used
   *    on StoreB, then the selector becomes saved as used;
   * @param  {Store} S1
   * @param  {Store} S2
   * @return {Store} a new Store
   */
  static merge(S1, S2) {
      // Takes all selectors not used on S2 and  return those who are not used on S1.
      const notFoundOnS2 = difference(S2._notFound, S1._found);
      // Takes all selectors not used on S1 and  return those who are not used S2.
      const notFoundOnS1   = difference(S1._notFound, S2._found);

      const found = union(S1._found, S2._found);
      const notFound = union(notFoundOnS1, notFoundOnS2);
      
    return new Store(found, notFound);
  }
}