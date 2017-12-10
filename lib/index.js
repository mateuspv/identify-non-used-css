'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
    value: function parse(document, stylesheet) {
      var exists = stylesheet.selectors.filter(function (_) {
        return document.exists(_);
      });
      var notUsed = stylesheet.selectors.filter(function (_) {
        return !document.exists(_);
      });

      return new _Store2.default(exists, notUsed);;
    }
  }, {
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this = this;

        var FL, _ref2, _ref3, htmls, styles, stylesheet, result;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                FL = new _FileLoader2.default({
                  html: this.options.htmls,
                  css: this.options.styles
                });
                _context.next = 3;
                return FL.load();

              case 3:
                _ref2 = _context.sent;
                _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
                htmls = _ref3[0];
                styles = _ref3[1];
                _context.next = 9;
                return new _CSS2.default(styles).process();

              case 9:
                stylesheet = _context.sent;
                result = htmls.map(function (_) {
                  return _this.parse(new _DOM2.default(_), stylesheet);
                });
                return _context.abrupt('return', result);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return IdentifyCSS;
}();

exports.default = IdentifyCSS;