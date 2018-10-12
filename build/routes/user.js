'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../api/user');

var _user2 = _interopRequireDefault(_user);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _check_auth = require('../middleware/check_auth');

var _check_auth2 = _interopRequireDefault(_check_auth);

var _get_user_id = require('../middleware/get_user_id');

var _get_user_id2 = _interopRequireDefault(_get_user_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

var userRouter = _express2.default.Router({
  mergeParams: true
});
var db = new _user2.default(process.env.DB, 'users');

userRouter.use(_bodyParser2.default.json());
userRouter.use(_bodyParser2.default.urlencoded({ extended: true }));
//userRouter.all('*', checkAuth)
// ---- Get User Data: ------------------------------
userRouter.get('/data/', _get_user_id2.default, function (req, res, next) {
  var data = ['username', 'gender', 'credit', 'role'];
  db.fetchById(req.user_id, data).then(function (user) {
    res.status(200).json({
      user: {
        username: user.username,
        credit: user.credit,
        role: Number(user.role),
        gender: user.gender !== null ? user.gender : -1
      }
    });
  }).catch(function (error) {
    return console.log(error.message);
  });
});

// ---- Save User Data: ------------------------------

userRouter.post('/data/:user_id', _check_auth2.default, function (req, res, next) {
  var data = req.body.data.data;


  db.updateUserData(req.params, { data: data }).then(function (err, user) {
    if (err) {
      res.status(400).json({
        errors: {
          global: err.msg
        }
      });
    } else {
      res.status(200).json({
        changes: true
      });
    }
  });
});

exports.default = userRouter;
//# sourceMappingURL=user.js.map