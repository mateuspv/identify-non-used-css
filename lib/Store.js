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

var Store = function () {
  function Store() {
    (0, _classCallCheck3.default)(this, Store);

    this._found = (0, _mori.set)();
    this._notFound = (0, _mori.set)();
  }

  (0, _createClass3.default)(Store, [{
    key: 'found',
    value: function found(selector) {
      this._found = (0, _mori.conj)(this._found, selector);
    }
  }, {
    key: 'notFound',
    value: function notFound(selector) {
      return this._notFound = (0, _mori.conj)(this._notFound, selector);
    }
  }, {
    key: 'compute',
    value: function compute() {
      return {
        found: (0, _mori.toJs)(this._found),
        notFound: (0, _mori.toJs)(this._notFound)
      };
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '\n      found: ' + this.compute().found + '\n      not found: ' + this.compute().notFound + '\n      ';
    }
  }], [{
    key: 'merge',
    value: function merge(S1, S2) {
      // Takes all selectors not found on S2 and  return those who are not used on S1.
      var notFoundOnS2 = (0, _mori.difference)(S2._notFound, S1._found);
      // Takes all selectors not found on S1 and  return those who are not used S2.
      var notFoundOnS1 = (0, _mori.difference)(S1._notFound, S2._found);

      var notFound = (0, _mori.union)(notFoundOnS1, notFoundOnS2);

      return {
        found: (0, _mori.toJs)((0, _mori.union)(S1._found, S2._found)),
        notFound: (0, _mori.toJs)(notFound)
      };
    }
  }]);
  return Store;
}();

exports.default = Store;