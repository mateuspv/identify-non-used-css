'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mori = require('mori');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Store: A place for saves all used and non used selectors
 */
var Store = function () {
  function Store(used, notUsed) {
    (0, _classCallCheck3.default)(this, Store);

    this._used = (0, _mori.set)(used);
    this._notUsed = (0, _mori.set)(notUsed);
  }

  /**
   * Adds a selector to a used list
   * @param  {String} selector
   */


  (0, _createClass3.default)(Store, [{
    key: 'used',
    value: function used(selector) {
      this._used = (0, _mori.conj)(this._used, selector);
    }

    /**
     * Adds a selector to notUsed list
     * @param  {String} selector
     */

  }, {
    key: 'notUsed',
    value: function notUsed(selector) {
      return this._notUsed = (0, _mori.conj)(this._notUsed, selector);
    }

    /**
     * compose the used and notUsed selectors
     * @return {Object}
     */

  }, {
    key: 'compute',
    value: function compute() {
      return {
        used: (0, _mori.toJs)(this._used),
        notUsed: (0, _mori.toJs)(this._notUsed)
      };
    }

    /**
     * Simple log 
     * @return {String}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return '\n-------------------------------------\nUsed selectors:\n' + this.compute().used.join('\n') + '\n-------------------------------------\nNot used selectors:\n' + this.compute().notUsed.join('\n') + '\n-------------------------------------\n      ';
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

  }], [{
    key: 'merge',
    value: function merge(S1, S2) {
      // Takes all selectors not used on S2 and  return those who are not used on S1.
      var notUsedOnS2 = (0, _mori.difference)(S2._notUsed, S1._used);
      // Takes all selectors not used on S1 and  return those who are not used S2.
      var notUsedOnS1 = (0, _mori.difference)(S1._notUsed, S2._used);

      var used = (0, _mori.union)(S1._used, S2._used);
      var notUsed = (0, _mori.union)(notUsedOnS1, notUsedOnS2);

      return new Store(used, notUsed);
    }
  }]);
  return Store;
}();

exports.default = Store;