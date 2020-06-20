/* eslint-disable camelcase */
import sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import models from '../db/models';
import utils from '../utils/response';

const { Op } = sequelize;
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
    const { content } = req.body;
    if (!content) {
      return utils.errorStat(res, 400, 'content is required');
    }
    await models.Comment.create({
      content,
      uuid: uuidv4(),
      userId: req.user.id,
    });
    const commentResponse = await models.Comment.findAll({
      include: [
        {
          as: 'user',
          model: models.User,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return utils.successStat(res, 201, 'comment', commentResponse);
  }

  /**
   * @static
   * @description Fetches a single comment
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Single Comment
   * @memberof CommentController
   */
  static async getSingleComment(req, res) {
    const { comment_id } = req.params;
    if (!comment_id) {
      return utils.errorStat(res, 400, 'comment_id is required');
    }
    const comment = await models.Comment.findOne({
      where: { id: comment_id },
      include: [
        {
          as: 'user',
          model: models.User,
          attributes: ['id', 'name', 'email'],
        },
        {
          as: 'replies',
          model: models.Reply,
          attributes: ['id', 'content'],
        },
      ],
    });
    if (!comment) return utils.errorStat(res, 401, 'Comment not found');
    return utils.successStat(res, 200, 'comment', comment);
  }

  /**
   * @description Allows user get comments
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns Comments
   * @memberof CommentController
   */
  static async getComments(req, res) {
    const comment = await models.Comment.findAll({
      include: [
        {
          as: 'user',
          model: models.User,
          attributes: ['id', 'name', 'email'],
        },
        {
          as: 'replies',
          model: models.Reply,
          attributes: ['id', 'content', 'commentId'],
        },
      ],
    });
    if (!comment) {
      return utils.errorStat(res, 404, 'No comment found');
    }
    return utils.successStat(res, 200, 'comment', comment);
  }

  /**
   * @description updates a sinlge comment
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns updated comments
   * @memberof CommentController
   */
  static async updateComment(req, res) {
    const { content } = req.body;
    const { id } = req.user;
    const { comment_id } = req.params;
    if (!content) {
      return utils.errorStat(res, 400, 'Content is required');
    }
    const comment = await models.Comment.findOne({
      where: {
        [Op.and]: [{ id: parseInt(comment_id, 10) }, { userId: id }],
      },
    });

    if (!comment) {
      return utils.errorStat(res, 404, 'Comment not found.');
    }
    await models.Comment.update(
      { content },
      {
        returning: true,
        where: {
          [Op.and]: [{ id: parseInt(comment_id, 10) }, { userId: id }],
        },
      }
    );

    const updateResponse = await models.Comment.findOne({
      where: {
        [Op.and]: [{ userId: id }, { id: comment_id }],
      },
      include: [
        {
          as: 'user',
          model: models.User,
          attributes: ['id', 'name', 'email'],
        },
        {
          as: 'replies',
          model: models.Reply,
          attributes: ['id', 'content', 'commentId'],
        },
      ],
    });

    return utils.successStat(res, 200, 'comment', updateResponse);
  }

  /**
   * @description deletes a sinlge comment
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns a message
   * @memberof CommentController
   */
  static async deleteComment(req, res) {
    const { comment_id } = req.params;
    const { id } = req.user;
    if (!comment_id) {
      return utils.errorStat(res, 404, 'Comment not found');
    }
    models.Comment.destroy({
      returning: true,
      where: {
        [Op.and]: [{ id: comment_id }, { userId: id }],
      },
    });
    return utils.successStat(
      res,
      200,
      'message',
      'Comment deleted successfully'
    );
  }
}

export default CommentController;
