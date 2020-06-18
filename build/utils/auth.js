"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
const secret = process.env.JWT_SECRET;
/**
 * @module Auth
 * @description Authentication related methods
 */

class Auth {
  /**
   * @description Generated jwt token
   * @param {object} payload - Details to encode in the token
   * @returns {string} Generated token
   * @memberof Auth
   */
  static generateToken(payload) {
    const token = _jsonwebtoken.default.sign(payload, secret, {
      expiresIn: '7d'
    });

    return token;
  }
  /**
   * @static
   * @description Allows a user to sign up
   * @param {String} password - Password to be hashed
   * @returns {String} Encrypted password
   * @memberof Helper
   */


  static hashPassword(password) {
    return _bcryptjs.default.hashSync(password, 6);
  }
  /**
   * @static
   * @description Allows a user to sign up
   * @param {String} password - Request object
   * @param {String} hashPassword - Response object
   * @returns {Boolean} Returns true if the password is correct
   * @memberof Helper
   */


  static comparePassword(password, hashPassword) {
    return _bcryptjs.default.compareSync(password, hashPassword);
  }
  /**
   * @static
   * @description verifies a user
   * @param {String} password - Request object
   * @param {String} hashPassword - Response object
   * @returns {Boolean} Returns true if the password is correct
   * @memberof Auth
   */


  static async verifyUserToken(token, callBack) {
    return _jsonwebtoken.default.verify(token, secret, callBack);
  }

}

var _default = Auth;
exports.default = _default;