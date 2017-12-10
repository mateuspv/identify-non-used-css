'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _util = require('util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  readDirFiles: function readDirFiles(path) {
    var read = (0, _util.promisify)(_glob2.default);
    return read(path);
  },
  readFile: function readFile(path) {
    return (0, _util.promisify)(_fs2.default.readFile)(path, { encoding: 'utf8' });
  }
};