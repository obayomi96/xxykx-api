"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _models = _interopRequireDefault(require("../db/models"));

var _response = _interopRequireDefault(require("../utils/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */

/**
 * @Module ReplyController
 * @description Controlls reply created by users
 */
class ReplyController {
  /**
   * @static
   * @description Allows a user to reply a comment
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} returns a single comment, its replys, and user
   * @memberof ReplyController
   */
  static async addReply(req, res) {
    const {
      content
    } = req.body;
    const {
      comment_id
    } = req.params;

    if (!content) {
      _response.default.errorStat(res, 400, 'Reply content is required');
    } else if (!comment_id) {
      return _response.default.errorStat(res, 404, 'Comment not found');
    }

    await _models.default.Reply.create({
      content,
      uuid: (0, _uuid.v4)(),
      commentId: comment_id
    });
    const response = await _models.default.Comment.findOne({
      where: {
        id: comment_id
      },
      include: [{
        as: 'replies',
        model: _models.default.Reply,
        attributes: ['id', 'content', 'commentId']
      }]
    });
    return _response.default.successStat(res, 201, 'reply', response);
  }

}

var _default = ReplyController;
exports.default = _default;