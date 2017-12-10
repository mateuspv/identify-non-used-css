"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Output = function () {
  function Output(style) {
    (0, _classCallCheck3.default)(this, Output);

    this.style = style;
  }

  (0, _createClass3.default)(Output, [{
    key: "log",
    value: function log(Store) {
      console.log(Store.toString());
    }
  }, {
    key: "data",
    value: function data(Store) {
      return Store;
    }
  }, {
    key: "run",
    value: function run(Store) {
      return this[this.style](Store);
    }
  }]);
  return Output;
}();

exports.default = Output;