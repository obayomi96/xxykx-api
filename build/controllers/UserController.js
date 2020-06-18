"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = _interopRequireDefault(require("../db/models"));

var _response = _interopRequireDefault(require("../utils/response"));

var _auth = _interopRequireDefault(require("../utils/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Op
} = _sequelize.default;
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
    const {
      name,
      email,
      password
    } = req.body.user;
    const existingUser = await _models.default.User.findOne({
      where: {
        [Op.or]: [{
          email
        }]
      }
    });

    if (existingUser) {
      return _response.default.errorStat(res, 409, 'User Already Exists');
    }

    const newUser = { ...req.body.user,
      password: _auth.default.hashPassword(password)
    };
    const user = await _models.default.User.create(newUser);

    const token = _auth.default.generateToken({
      id: user.id,
      name,
      email
    });

    return _response.default.successStat(res, 201, 'user', {
      id: user.id,
      token,
      name,
      email
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
    const {
      email,
      password
    } = req.body.user;
    const user = await _models.default.User.findOne({
      where: {
        email
      }
    });
    if (!user) return _response.default.errorStat(res, 401, 'Incorrect Login information');

    const matchPasswords = _auth.default.comparePassword(password, user.password);

    if (!matchPasswords) {
      return _response.default.errorStat(res, 401, 'Incorrect Login information');
    }

    return _response.default.successStat(res, 200, 'user', {
      id: user.id,
      token: await _auth.default.generateToken({
        id: user.id,
        name: user.name,
        email: user.email
      }),
      name: user.name,
      email: user.name
    });
  }

}

var _default = UserController;
exports.default = _default;