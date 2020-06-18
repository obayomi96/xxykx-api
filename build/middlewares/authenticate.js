"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _response = _interopRequireDefault(require("../utils/response"));

var _auth = _interopRequireDefault(require("../utils/auth"));

var _models = _interopRequireDefault(require("../db/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  errorStat
} = _response.default;
/**
 * @Module Authenticate
 * @description Authentication related methods
 */

class Authenticate {
  /**
   * @static
   * @description Authenticate the routes
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {Object} next - Next function call
   * @returns {object} Json
   * @memberof Authenticate
   */
  static async verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return errorStat(res, 401, 'Authorization error');
    const token = req.headers.authorization.split(' ')[1] || authorizationHeader;
    let verifiedUser;

    try {
      verifiedUser = await _auth.default.verifyUserToken(token, async (err, decoded) => {
        if (err) {
          throw new Error();
        }

        return decoded;
      });
    } catch (err) {
      return errorStat(res, 401, 'invalid token');
    }

    const {
      id
    } = verifiedUser;
    const user = await _models.default.User.findByPk(id);

    if (!user) {
      return errorStat(res, 404, 'user not found');
    }

    req.user = user;
    return next();
  }
  /**
   * @static
   * @description Gets user details if the user is logged in. But returns next with
   * no details if the user is not logged in
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {Object} next - Next function call
   * @returns {object} Json
   * @memberof Authenticate
   */


  static async optionalLogin(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next();
    return Authenticate.verifyToken(req, res, next);
  }

}

var _default = Authenticate;
exports.default = _default;