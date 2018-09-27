'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkAuth(req, res, next) {
  try {
    var token = req.get('Authorization');
    var user_id = req.params.user_id;

    var verifyed = _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
    if (Number(user_id) !== Number(verifyed.user_id)) {
      return res.status(401).json({ message: 'Unauthorized request' });
    } else {
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: err });
  }
}

exports.default = checkAuth;
//# sourceMappingURL=check_auth.js.map