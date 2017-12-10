'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSS = function () {
  function CSS(css) {
    (0, _classCallCheck3.default)(this, CSS);

    this.css = css;
  }

  (0, _createClass3.default)(CSS, [{
    key: 'process',
    value: function process() {
      var _this = this;

      var allSelectorsFound = [];

      var plugin = _postcss2.default.plugin('postcss-selectors', function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return function (root) {
          root.walkRules(function (rule) {
            return allSelectorsFound.push(rule.selector);
          });
        };
      });

      return (0, _postcss2.default)([plugin]).process(this.css).then(function (_) {
        _this.selectors = allSelectorsFound;
        return _this;
      });
    }
  }]);
  return CSS;
}();

exports.default = CSS;