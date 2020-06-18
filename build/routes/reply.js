"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _ReplyController = _interopRequireDefault(require("../controllers/ReplyController"));

var _middlewares = _interopRequireDefault(require("../middlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ReplyRoute = (0, _express.default)();
ReplyRoute.post('/:comment_id/replies', _middlewares.default.verifyToken, _ReplyController.default.addReply);
var _default = ReplyRoute;
exports.default = _default;