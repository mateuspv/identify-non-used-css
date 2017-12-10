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
  function Store(used, nonUsed) {
    (0, _classCallCheck3.default)(this, Store);

    this._found = (0, _mori.set)(used);
    this._notFound = (0, _mori.set)(nonUsed);
  }

  /**
   * Adds a selector to a found list
   * @param  {String} selector
   */


  (0, _createClass3.default)(Store, [{
    key: 'found',
    value: function found(selector) {
      this._found = (0, _mori.conj)(this._found, selector);
    }

    /**
     * Adds a selector to notFound list
     * @param  {String} selector
     */

  }, {
    key: 'notFound',
    value: function notFound(selector) {
      return this._notFound = (0, _mori.conj)(this._notFound, selector);
    }

    /**
     * compose the used and nonUsed selectors
     * @return {Object}
     */

  }, {
    key: 'compute',
    value: function compute() {
      return {
        found: (0, _mori.toJs)(this._found),
        notFound: (0, _mori.toJs)(this._notFound)
      };
    }

    /**
     * Simple log 
     * @return {String}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return '\n      found: ' + this.compute().found + '\n      not found: ' + this.compute().notFound + '\n      ';
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

  }], [{
    key: 'merge',
    value: function merge(S1, S2) {
      // Takes all selectors not used on S2 and  return those who are not used on S1.
      var notFoundOnS2 = (0, _mori.difference)(S2._notFound, S1._found);
      // Takes all selectors not used on S1 and  return those who are not used S2.
      var notFoundOnS1 = (0, _mori.difference)(S1._notFound, S2._found);

      var found = (0, _mori.union)(S1._found, S2._found);
      var notFound = (0, _mori.union)(notFoundOnS1, notFoundOnS2);

      return new Store(found, notFound);
    }
  }]);
  return Store;
}();

exports.default = Store;