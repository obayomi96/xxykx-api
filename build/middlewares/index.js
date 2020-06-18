"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = _interopRequireDefault(require("./authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  verifyToken
} = _authenticate.default;
var _default = {
  verifyToken
};
exports.default = _default;