import {set, conj, union, difference, toJs} from 'mori';

/**
 * Store: A place for saves all used and non used selectors
 */
export default class Store {
  constructor(used, notUsed) {
    this._used = set(used);
    this._notUsed = set(notUsed);
  }

  /**
   * Adds a selector to a used list
   * @param  {String} selector
   */
  used(selector) {
    this._used = conj(this._used, selector);
  }

  /**
   * Adds a selector to notUsed list
   * @param  {String} selector
   */
  notUsed(selector) {
    return this._notUsed = conj(this._notUsed, selector);
  }

  /**
   * compose the used and notUsed selectors
   * @return {Object}
   */
  compute() {
    return  {
      used: toJs(this._used),
      notUsed: toJs(this._notUsed)
    }
  }

  /**
   * Simple log 
   * @return {String}
   */
  toString() {
    return `
-------------------------------------
Used selectors:
${this.compute().used.join('\n')}
-------------------------------------
Not used selectors:
${this.compute().notUsed.join('\n')}
-------------------------------------
      `
  }

  /**
   * merge two Stores
   *  - merge all used selectors
   *  - merge all selectors not used on both stores,
   *    if some selector is not used on StoreA, but is used
   *    on StoreB, then the selector becomes saved as used;
   * @param  {Store} S1
   * @param  {Store} S2
   * @return {Store} a new Store
   */
  static merge(S1, S2) {
      // Takes all selectors not used on S2 and  return those who are not used on S1.
      const notUsedOnS2 = difference(S2._notUsed, S1._used);
      // Takes all selectors not used on S1 and  return those who are not used S2.
      const notUsedOnS1   = difference(S1._notUsed, S2._used);

      const used = union(S1._used, S2._used);
      const notUsed = union(notUsedOnS1, notUsedOnS2);
    
    return new Store(used, notUsed);
  }
}