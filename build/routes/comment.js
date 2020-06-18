"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _CommentController = _interopRequireDefault(require("../controllers/CommentController"));

var _middlewares = _interopRequireDefault(require("../middlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commentRoute = (0, _express.default)();
commentRoute.post('/', _middlewares.default.verifyToken, _CommentController.default.addComment);
commentRoute.get('/', _CommentController.default.getComments);
commentRoute.patch('/:comment_id', _middlewares.default.verifyToken, _CommentController.default.updateComment);
commentRoute.delete('/:comment_id', _middlewares.default.verifyToken, _CommentController.default.deleteComment);
var _default = commentRoute;
exports.default = _default;