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

    if (!user) return utils.errorStat(res, 401, 'Incorrect Login information');
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
      email: user.name,
    });
  }
}

export default UserController;
