'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _util = require('util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileLoader = function () {
  function FileLoader(settings) {
    (0, _classCallCheck3.default)(this, FileLoader);

    this.settings = settings;
  }

  (0, _createClass3.default)(FileLoader, [{
    key: 'readDirFiles',
    value: function readDirFiles(path) {
      var read = (0, _util.promisify)(_glob2.default);
      return read(path);
    }
  }, {
    key: 'readFile',
    value: function readFile(path) {
      return (0, _util.promisify)(_fs2.default.readFile)(path, { encoding: 'utf8' });
    }
  }, {
    key: 'loadHtml',
    value: function loadHtml() {
      var _this = this;

      return this.readDirFiles(this.settings.html).then(function (paths) {
        return paths.map(function (p) {
          return _this.readFile(p);
        });
      }).then(function (files) {
        return _promise2.default.all(files);
      });
    }
  }, {
    key: 'loadCss',
    value: function loadCss() {
      var _this2 = this;

      return this.readDirFiles(this.settings.css).then(function (paths) {
        return paths.map(function (p) {
          return _this2.readFile(p);
        });
      }).then(function (files) {
        return _promise2.default.all(files);
      }).then(function (f) {
        return f.join('');
      });
    }
  }, {
    key: 'load',
    value: function load() {
      return _promise2.default.all([this.loadHtml(), this.loadCss()]);
    }
  }]);
  return FileLoader;
}();

exports.default = FileLoader;