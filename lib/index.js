'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _DOM = require('./DOM');

var _DOM2 = _interopRequireDefault(_DOM);

var _CSS = require('./CSS');

var _CSS2 = _interopRequireDefault(_CSS);

var _FS = require('./FS');

var _FS2 = _interopRequireDefault(_FS);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IdentifyCSS = function () {
  function IdentifyCSS(options) {
    (0, _classCallCheck3.default)(this, IdentifyCSS);

    this.options = options;
  }

  (0, _createClass3.default)(IdentifyCSS, [{
    key: 'parse',
    value: function parse(html, styles) {
      var document = new _DOM2.default(html);
      var stylesheet = new _CSS2.default(styles);
      var S = new _Store2.default();

      stylesheet.process().then(function () {
        return stylesheet.selectors.forEach(function (_) {
          console.log(_);
        });
      });
    }
  }, {
    key: 'loadHtml',
    value: function loadHtml(path) {
      return _FS2.default.readDirFiles(path).then(function (paths) {
        return paths.map(function (p) {
          return _FS2.default.readFile(p);
        });
      }).then(function (files) {
        return _promise2.default.all(files);
      });
    }
  }, {
    key: 'loadCss',
    value: function loadCss(path) {
      return _FS2.default.readDirFiles(path).then(function (paths) {
        return paths.map(function (p) {
          return _FS2.default.readFile(p);
        });
      }).then(function (files) {
        return _promise2.default.all(files);
      }).then(function (f) {
        return f.join('');
      });
    }
  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      var p1 = this.loadHtml(this.options.HTML_FILES_PATH);
      var p2 = this.loadCss(this.options.CSS_FILES_PATH);

      return _promise2.default.all([p1, p2]).then(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            htmls = _ref2[0],
            styles = _ref2[1];

        htmls.forEach(function (_) {
          return _this.parse(_, styles);
        });
      });
    }
  }]);
  return IdentifyCSS;
}();

exports.default = IdentifyCSS;