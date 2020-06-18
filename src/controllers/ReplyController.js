/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';
import models from '../db/models';
import utils from '../utils/response';

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
    const { content } = req.body;
    const { comment_id } = req.params;
    if (!content) {
      utils.errorStat(res, 400, 'Reply content is required');
    } else if (!comment_id) {
      return utils.errorStat(res, 404, 'Comment not found');
    }
    await models.Reply.create({
      content,
      uuid: uuidv4(),
      commentId: comment_id,
    });
    const response = await models.Comment.findOne({
      where: {
        id: comment_id,
      },
      include: [
        {
          as: 'replies',
          model: models.Reply,
          attributes: ['id', 'content', 'commentId'],
        },
      ],
    });
    return utils.successStat(res, 201, 'reply', response);
  }
}

export default ReplyController;
