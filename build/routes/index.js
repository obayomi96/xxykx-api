"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./user"));

var _comment = _interopRequireDefault(require("./comment"));

var _reply = _interopRequireDefault(require("./reply"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.default)();
router.get('/', (req, res) => res.status(200).json({
  status: res.statusCode,
  message: 'Welcome to comments API'
}));
router.use('/', _user.default);
router.use('/comments', _comment.default);
router.use('/comments', _reply.default);
var _default = router;
exports.default = _default;