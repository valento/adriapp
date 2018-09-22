'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _template = require('./template');

var _user = require('./api/user');

var _user2 = _interopRequireDefault(_user);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* -------------------------------------------------------------- */


//import React from 'react'
//import { Provider } from 'react-redux'
//import { renderToString } from 'react-dom/server'
//import { StaticRouter } from 'react-router'
var users = [];

// ==== PASSPORT ============================================
/*
passport.use(new LocalStrategy((user, done) => {
  //
}))
*/
// ==========================================================

//
//import S3 from 'aws-sdk/clients/s3'
var app = (0, _express2.default)();

var db = new _user2.default('./data/aapp.db', 'users');
//const s3 = new S3({})
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var lng = void 0;
var PORT = process.env.PORT || 8000;
var ENV = process.env.NODE_ENV || 'development';
console.log(ENV);
var ENTRY = ENV === 'production' ? '../dist/index.html' : '../client/index.html';

if (ENV === 'development') {
  /* ------ IN MEMORY bundle configuration ---------------------------- */
  var wpConfig = require('../webpack.conf.js')(ENV);
  var webpack = require('webpack');
  var wpMiddle = require('webpack-dev-middleware');
  var wpHot = require('webpack-hot-middleware');
  var compiler = webpack(wpConfig);
  app.use(wpMiddle(compiler, {
    hot: true
  }));
  app.use(wpHot(compiler));
  app.use('/client', _express2.default.static(_path2.default.join(__dirname, '../client')));
} else {
  // PRODUCTION configuration
  app.use('/dist', _express2.default.static(_path2.default.join(__dirname, '../dist')));
}
/*
app.use('/user/data/', (req,res) => {
  if(!req.headers.authorization) {
    res.status(400).json({errors: {
      global: 'Unauthorized request! Login first..'
    }})
  } else {
    next()
  }
})
*/

// ==== AUTHORIZATION ROOTS ==========================
// ---- Get User Data: ------------------------------
app.get('/user/data/:user_id', function (req, res) {
  var data = ['username', 'gender', 'credit', 'role'];
  db.fetchById(req.params, data).then(function (user) {
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

app.post('/user/data/:user_id', function (req, res) {
  var data = req.body.data.data;

  console.log(data);
  db.updateUserData(req.params, { data: data }).then(function (err, user) {
    if (err) {
      res.status(400).json({
        errors: {
          global: err.msg
        }
      });
    } else {
      res.status(200).json({
        message: {
          globals: 'Data saved successfully...'
        }
      });
    }
  });
});

// ==== Check: if user-email exist ===================
app.get('/auth/test', function (req, res) {
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
      var msg = lng === 'es' ? 'Como estas, mi ' + result.username + '!' : 'Hello, dear ' + result.username + '!';
      res.status(200).json({ message: { global: msg } });
    }
  });
});
// ----- AUTH: Signup with crdentials: ----------------
app.post('/auth/login', function (req, res) {
  var _req$body$credentials = req.body.credentials,
      email = _req$body$credentials.email,
      password = _req$body$credentials.password;

  var msg = void 0;
  if (!email || !password) {
    msg = lng === 'es' ? 'Faltan Credenciales!' : 'Missing Credentials!';
    res.status(400).json({ errors: { global: msg } });
    return;
  }
  var data = ['email', 'password', 'username', 'gender', 'credit', 'role', 'user_id'];
  db.fetchOne({ email: email }, data).then(function (user) {
    if (user && _bcryptNodejs2.default.compareSync(password, user.password)) {
      var token = _jsonwebtoken2.default.sign({
        email: user.email,
        user_id: user.user_id
      }, 'mysecrethere');
      res.status(200).json({
        user: {
          token: token,
          username: user.username,
          gender: user.gender,
          credit: user.credit,
          role: user.role,
          user_id: user.user_id
        }
      });
    } else {
      msg = lng === 'es' ? 'Credenciales Incorrectos...' : 'Wrong Credentials...';
      res.status(400).json({ errors: { global: msg } });
    }
  });
});
// ----- AUTH: Save all crdentials: ------------------
app.post('/auth/signup', function (req, res) {
  var _req$body$credentials2 = req.body.credentials,
      email = _req$body$credentials2.email,
      password = _req$body$credentials2.password;

  var msg = void 0;
  console.log('Server Auth User: ', email);
  if (!email || !password) {
    msg = lng === 'es' ? 'Faltan Credenciales...' : 'Missing Credentials...';
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
          user_id: user.user_id
        }, 'mysecrethere');
        res.status(200).json({
          user: {
            token: token,
            username: user.username,
            gender: user.gender,
            credit: user.credit,
            role: user.role,
            user_id: user.user_id
          }
        });
      });
    }).catch(function (err) {
      return res.status(500).json({ errors: { global: err.message } });
    });
  });
});
// ----------------------------------------------------------
/*
app.post('/auth/user', (req,res) => {

  const token = jwt.sign({
    // Object to Encript and Save
    sub: user.id,
    username: user.username
    // Secrete key signe
  }, 'mysupersecrete', expiresIn: '3 Hours')

  res.status(200).send({access_token: token})
})
*/

/*
app.use((req,res) => {
  //if(req.cookie.authenticated)
})
*/

// ================================================================
app.get('/client/css/img/:id', function (req, res) {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id);
});
app.get('/dist/img/:id', function (req, res) {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id);
});

// === Root SERVER REndering ===========================================

app.get('*', function (req, res) {
  lng = req.headers['accept-language'].split(',')[0].split('-')[0];
  var lan = lng.match(/^(es)/) ? 'es' : 'en';
  var params = {
    ln: lan,
    env: ENV
  };
  var markup = (0, _template.template)(params);
  res.send(markup);
  //res.set({'Content-Language': lan}).sendFile(path.join(__dirname, ENTRY))

  //  const store = {}
  //  const params = {
  //  entry: ENTRY
  //}
  //  const markup = renderToString(
  //    <Provider store={store}>
  //      <StaticRouter location={req.url}>
  //        <Route component={App} />
  //      </StaticRouter>
  //    </Provider>
  //  )
  //  const iState = {
  //    lan: lng
  //  }

  //res.send(template(params, markup, iState))
});

var server = app.listen(PORT, function () {
  console.log('Server running on: ', PORT);
});
//# sourceMappingURL=index.js.map