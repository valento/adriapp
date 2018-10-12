'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserId(req, res, next) {
  try {
    var token = req.get('Authorization');
    var decoded = _jsonwebtoken2.default.decode(token);
    console.log('Middleware UID: ', decoded);
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
}

exports.default = getUserId;
//# sourceMappingURL=get_user_id.js.map