"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRoute = (0, _express.default)();
userRoute.post('/register', _UserController.default.signUp);
userRoute.post('/login', _UserController.default.login);
var _default = userRoute;
exports.default = _default;