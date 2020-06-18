"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _uuid = require("uuid");

var _models = _interopRequireDefault(require("../db/models"));

var _response = _interopRequireDefault(require("../utils/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const {
  Op
} = _sequelize.default;
/**
 * @Module CommentController
 * @description Controlls comments made by users
 */

class CommentController {
  /**
   * @static
   * @description Allows a user to create a comment
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Comments
   * @memberof CommentController
   */
  static async addComment(req, res) {
    const {
      content
    } = req.body;

    if (!content) {
      return _response.default.errorStat(res, 400, 'content is required');
    }

    await _models.default.Comment.create({
      content,
      uuid: (0, _uuid.v4)(),
      userId: req.user.id
    });
    const commentResponse = await _models.default.Comment.findAll({
      include: [{
        as: 'user',
        model: _models.default.User,
        attributes: ['id', 'name', 'email']
      }]
    });
    return _response.default.successStat(res, 201, 'comment', commentResponse);
  }
  /**
   * @description Allows user get comments
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns Comments
   * @memberof CommentController
   */


  static async getComments(req, res) {
    const comment = await _models.default.Comment.findAll({
      include: [{
        as: 'user',
        model: _models.default.User,
        attributes: ['id', 'name', 'email']
      }, {
        as: 'replies',
        model: _models.default.Reply,
        attributes: ['id', 'content', 'commentId']
      }]
    });

    if (!comment) {
      return _response.default.errorStat(res, 404, 'No comment found');
    }

    return _response.default.successStat(res, 200, 'comment', comment);
  }
  /**
   * @description updates a sinlge article
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns updated comments
   * @memberof CommentController
   */


  static async updateComment(req, res) {
    const {
      content
    } = req.body;
    const {
      id
    } = req.user;
    const {
      comment_id
    } = req.params;

    if (!content) {
      return _response.default.errorStat(res, 400, 'Content is required');
    }

    const comment = await _models.default.Comment.findOne({
      where: {
        [Op.and]: [{
          id: parseInt(comment_id, 10)
        }, {
          userId: id
        }]
      }
    });

    if (!comment) {
      return _response.default.errorStat(res, 404, 'Comment not found.');
    }

    await _models.default.Comment.update({
      content
    }, {
      returning: true,
      where: {
        [Op.and]: [{
          id: parseInt(comment_id, 10)
        }, {
          userId: id
        }]
      }
    });
    const updateResponse = await _models.default.Comment.findOne({
      where: {
        [Op.and]: [{
          userId: id
        }, {
          id: comment_id
        }]
      },
      include: [{
        as: 'user',
        model: _models.default.User,
        attributes: ['id', 'name', 'email']
      }, {
        as: 'replies',
        model: _models.default.Reply,
        attributes: ['id', 'content', 'commentId']
      }]
    });
    return _response.default.successStat(res, 200, 'comment', updateResponse);
  }
  /**
   * @description deletes a sinlge article
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns a message
   * @memberof CommentController
   */


  static async deleteComment(req, res) {
    const {
      comment_id
    } = req.params;
    const {
      id
    } = req.user;

    if (!comment_id) {
      return _response.default.errorStat(res, 404, 'Comment not found');
    }

    _models.default.Comment.destroy({
      returning: true,
      where: {
        [Op.and]: [{
          id: comment_id
        }, {
          userId: id
        }]
      }
    });

    return _response.default.successStat(res, 200, 'message', 'Comment deleted successfully');
  }

}

var _default = CommentController;
exports.default = _default;