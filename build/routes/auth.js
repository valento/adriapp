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

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

var authRouter = _express2.default.Router({
  mergeParams: true
});
authRouter.use(_bodyParser2.default.json());
authRouter.use(_bodyParser2.default.urlencoded({ extended: true }));

var db = new _user2.default(process.env.DB);
var lng = void 0;
var lan = void 0;
// ==== Check: if user-email exist ===================
authRouter.get('/test', function (req, res) {
  if (lng === undefined) {
    lng = req.headers['accept-language'].split(',')[0];
  } else {
    lan = lng.match(/^(es)/) ? 'es' : 'en';
  }
  console.log(lan);
  //const { email } = req.query//req.body.credentials
  db.fetchOne(req.query).then(function (result) {
    if (!result || undefined) {
      // If not: invite to subscribe
      res.status(400).json({
        errors: {
          global: 'Suscribe ya...'
        }
      });
    } else {
      var msg = lan === 'es' ? 'Como estas, mi ' + result.username + '!' : 'Hello, dear ' + result.username + '!';
      res.status(200).json({ message: { global: msg } });
    }
  });
});
// ----- AUTH: Signup with crdentials: ----------------
authRouter.post('/login', function (req, res) {
  if (lng === undefined) {
    lng = req.headers['accept-language'].split(',')[0];
  } else {
    lan = lng.match(/^(es)/) ? 'es' : 'en';
  }
  console.log(lan);
  var _req$body$credentials = req.body.credentials,
      email = _req$body$credentials.email,
      password = _req$body$credentials.password;

  var msg = void 0;
  if (!email || !password) {
    msg = lan === 'es' ? 'Faltan Credenciales!' : 'Missing Credentials!';
    res.status(400).json({ errors: { global: msg } });
    return;
  }
  var data = ['email', 'password', 'username', 'gender', 'credit', 'role', 'user_id'];
  db.fetchOne({ email: email }, data).then(function (user) {
    if (user && _bcryptNodejs2.default.compareSync(password, user.password)) {
      var token = _jsonwebtoken2.default.sign({
        email: user.email,
        user_id: user.user_id,
        role: user.role
      }, process.env.JWT_SECRET);
      res.status(200).json({
        user: {
          token: token,
          username: user.username,
          gender: user.gender,
          credit: user.credit,
          role: user.role
        }
      });
    } else {
      msg = lan === 'es' ? 'Credenciales Incorrectos...' : 'Wrong Credentials...';
      res.status(400).json({ errors: { global: msg } });
    }
  });
});
// ----- AUTH: Save all crdentials: ------------------
authRouter.post('/signup', function (req, res) {
  if (lng === undefined) {
    lng = req.headers['accept-language'].split(',')[0];
  } else {
    lan = lng.match(/^(es)/) ? 'es' : 'en';
  }
  console.log(lan);
  var _req$body$credentials2 = req.body.credentials,
      email = _req$body$credentials2.email,
      password = _req$body$credentials2.password;

  var msg = void 0;
  console.log('Server Auth User: ', email);
  if (!email || !password) {
    msg = lan === 'es' ? 'Faltan Credenciales...' : 'Missing Credentials...';
    res.status(400).json({ errors: { global: msg } });
    return;
  }
  _bcryptNodejs2.default.hash(password, _bcryptNodejs2.default.genSalt(8, function () {}), null, function (err, hash) {
    db.signUpUser({ email: email, hash: hash }).then(function (data) {
      // !!!! Correct data set:
      var email = data.email;

      var params = ['email', 'password', 'username', 'gender', 'credit', 'role', 'user_id'];
      db.fetchOne({ email: email }, params).then(function (user) {
        var token = _jsonwebtoken2.default.sign({
          email: user.email,
          user_id: user.user_id,
          role: user.role
        }, process.env.JWT_SECRET);
        res.status(200).json({
          user: {
            token: token,
            username: user.username,
            gender: user.gender,
            credit: user.credit,
            role: user.role
          }
        });
      });
    }).catch(function (err) {
      return res.status(500).json({ errors: { global: err.message } });
    });
  });
});

exports.default = authRouter;
//# sourceMappingURL=auth.js.map