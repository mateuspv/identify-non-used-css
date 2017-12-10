'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _DOM = require('./DOM');

var _DOM2 = _interopRequireDefault(_DOM);

var _CSS = require('./CSS');

var _CSS2 = _interopRequireDefault(_CSS);

var _FS = require('./FS');

var _FS2 = _interopRequireDefault(_FS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTML_FILES_PATH = './dummy/*.html';
var CSS_FILES_PATH = './dummy/*.css';

var run = function run(html, styles) {

  var document = new _DOM2.default(html);
  var stylesheet = new _CSS2.default(styles);

  stylesheet.process().then(function () {
    return stylesheet.selectors.forEach(function (_) {
      console.log(_);
    });
  });
};

var loadHtml = function loadHtml(path) {
  return _FS2.default.readDirFiles(HTML_FILES_PATH).then(function (paths) {
    return paths.map(function (p) {
      return _FS2.default.readFile(p);
    });
  }).then(function (files) {
    return _promise2.default.all(files);
  });
};

var loadCss = function loadCss(path) {
  return _FS2.default.readDirFiles(path).then(function (paths) {
    return paths.map(function (p) {
      return _FS2.default.readFile(p);
    });
  }).then(function (files) {
    return _promise2.default.all(files);
  }).then(function (f) {
    return f.join('');
  });
};

_promise2.default.all([loadHtml(HTML_FILES_PATH), loadCss(CSS_FILES_PATH)]).then(function (_ref) {
  var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
      htmls = _ref2[0],
      styles = _ref2[1];

  htmls.forEach(function (_) {
    return run(_, styles);
  });
});