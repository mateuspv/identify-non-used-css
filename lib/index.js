'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _DOM = require('./DOM');

var _DOM2 = _interopRequireDefault(_DOM);

var _CSS = require('./CSS');

var _CSS2 = _interopRequireDefault(_CSS);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _FileLoader = require('./FileLoader');

var _FileLoader2 = _interopRequireDefault(_FileLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IdentifyCSS = function () {
  function IdentifyCSS(options) {
    (0, _classCallCheck3.default)(this, IdentifyCSS);

    this.options = options;
  }

  (0, _createClass3.default)(IdentifyCSS, [{
    key: 'parse',
    value: function parse(html, stylesheet) {
      var document = new _DOM2.default(html);
      var S = new _Store2.default();

      stylesheet.selectors.filter(function (_) {
        return document.exists(_);
      }).forEach(function (_) {
        return S.found(_);
      });

      stylesheet.selectors.filter(function (_) {
        return !document.exists(_);
      }).forEach(function (_) {
        return S.notFound(_);
      });
    }
  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      var FL = new _FileLoader2.default({
        html: this.options.htmls,
        css: this.options.styles
      });

      return FL.load().then(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            htmls = _ref2[0],
            styles = _ref2[1];

        return new _CSS2.default(styles).process().then(function (stylesheet) {
          return [htmls, stylesheet];
        });
      }).then(function (_ref3) {
        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
            htmls = _ref4[0],
            stylesheet = _ref4[1];

        htmls.forEach(function (_) {
          return _this.parse(_, stylesheet);
        });
      });
    }
  }]);
  return IdentifyCSS;
}();

exports.default = IdentifyCSS;


new IdentifyCSS({
  htmls: './dummy/**.html',
  styles: './dummy/**.css'
}).run();