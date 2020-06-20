/* eslint-disable camelcase */
import sequelize from 'sequelize';
import models from '../db/models';
import utils from '../utils/response';
import auth from '../utils/auth';

const { Op } = sequelize;

/**
 * @Module UserController
 * @description Controlls all the user based activity
 */
class UserController {
  /**
   * @static
   * @description Allows a user to sign up
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof UserController
   */
  static async signUp(req, res) {
    const { name, email, password } = req.body.user;
    const existingUser = await models.User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });
    if (existingUser) {
      return utils.errorStat(res, 409, 'User Already Exists');
    }
    const newUser = { ...req.body.user, password: auth.hashPassword(password) };
    const user = await models.User.create(newUser);
    const token = auth.generateToken({ id: user.id, name, email });
    return utils.successStat(res, 201, 'user', {
      id: user.id,
      token,
      name,
      email,
    });
  }

  /**
   * @static
   * @description Allows a user to sign in
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof UserController
   */
  static async login(req, res) {
    const { email, password } = req.body.user;
    const user = await models.User.findOne({ where: { email } });

    if (!user)
      return utils.errorStat(
        res,
        401,
        'User not found, check your login details'
      );
    const matchPasswords = auth.comparePassword(password, user.password);
    if (!matchPasswords) {
      return utils.errorStat(res, 401, 'Incorrect Login information');
    }
    return utils.successStat(res, 200, 'user', {
      id: user.id,
      token: await auth.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
      name: user.name,
      email: user.email,
    });
  }

  /**
   * @static
   * @description Allows a user to fetch own profile
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Single user profile
   * @memberof UserController
   */
  static async fetchOwnProfile(req, res) {
    const { user_id } = req.params;
    const { id } = req.user;
    if (!user_id) {
      return utils.errorStat(res, 400, 'user_id is required');
    }
    if (parseInt(user_id, 10) !== id) {
      return utils.errorStat(res, 403, 'Unauthorized');
    }
    const profile = await models.User.findOne({
      where: { id: user_id },
      include: [
        {
          as: 'comments',
          model: models.Comment,
          attributes: ['id', 'content'],
        },
      ],
    });
    if (!profile) return utils.errorStat(res, 401, 'Profile not found');
    return utils.successStat(res, 200, 'profile', profile);
  }

  /**
   * @static
   * @description Allows a user to create a comment
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Single Commentg
   * @memberof UserController
   */
  static async fetchProfile(req, res) {
    const { user_id } = req.params;
    if (!user_id) {
      return utils.errorStat(res, 400, 'user_id is required');
    }
    const profile = await models.User.findOne({
      where: { id: user_id },
      include: [
        {
          as: 'comments',
          model: models.Comment,
          attributes: ['id', 'content'],
        },
      ],
    });
    if (!profile) return utils.errorStat(res, 401, 'Profile not found');
    return utils.successStat(res, 200, 'profile', {
      name: profile.name,
      email: profile.email,
    });
  }

  /**
   * @description updates a user profile
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns updated user profile
   * @memberof UserController
   */
  static async updateProfile(req, res) {
    const { name, email } = req.body;
    const { id } = req.user;
    const { user_id } = req.params;
    if (!name || !email) {
      return utils.errorStat(res, 400, 'Name or Email canno be empty');
    }
    if (parseInt(user_id, 10) !== id) {
      return utils.errorStat(res, 403, 'Unauthorized');
    }
    const user = await models.User.findOne({
      where: {
        [Op.and]: [{ id: parseInt(user_id, 10) }, { id }],
      },
    });

    if (!user) {
      return utils.errorStat(res, 404, 'user not found.');
    }
    await models.User.update(
      { email, name },
      {
        returning: true,
        where: {
          [Op.and]: [{ id: parseInt(user_id, 10) }, { id }],
        },
      }
    );

    const updateResponse = await models.User.findOne({
      where: {
        [Op.and]: [{ id }, { id: user_id }],
      },
      include: [
        {
          as: 'comments',
          model: models.Comment,
          attributes: ['id', 'content', 'userId'],
        },
      ],
    });

    return utils.successStat(res, 200, 'profile', updateResponse);
  }
}

export default UserController;
