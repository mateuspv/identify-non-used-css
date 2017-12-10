'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsdom = require('jsdom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOM = function () {
  function DOM(html) {
    (0, _classCallCheck3.default)(this, DOM);

    this.html = html;
  }

  (0, _createClass3.default)(DOM, [{
    key: 'parse',
    value: function parse(html) {
      this.dom = new _jsdom.JSDOM(this.html);
    }
  }, {
    key: 'query',
    value: function query(q) {
      if (!this.dom) {
        this.parse();
      }

      return this.dom.window.document.querySelectorAll(q);
    }
  }, {
    key: 'exists',
    value: function exists(q) {
      return this.query(q).length !== 0;
    }
  }]);
  return DOM;
}();

exports.default = DOM;