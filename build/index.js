'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _s = require('aws-sdk/clients/s3');

var _s2 = _interopRequireDefault(_s);

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
var users = [];

// ==== PASSPORT ============================================
/*
passport.use(new LocalStrategy((user, done) => {
  //
}))
*/
// ==========================================================

var app = (0, _express2.default)();

var db = new _user2.default('./data/aapp.db', 'users');
//const s3 = new S3({})
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

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

// ==== AUTHORIZATION ROOTS ==========================
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
      res.status(200).json({
        message: {
          global: 'Hola, mi ' + result.username + '!'
        }
      });
    }
  });
});
// ----- AUTH: Signup with crdentials: ----------------
app.post('/auth/login', function (req, res) {
  var _req$body$credentials = req.body.credentials,
      email = _req$body$credentials.email,
      password = _req$body$credentials.password;

  if (!email || !password) {
    res.status(400).json({
      errors: { global: 'Missing Credentials!' }
    });
    return;
  }
  var data = ['email', 'password', 'username', 'gender', 'credit', 'role', 'user_id'];
  db.fetchOne({ email: email }, data).then(function (user) {
    if (user && _bcryptNodejs2.default.compareSync(password, user.password)) {
      res.status(200).json({
        user: {
          username: user.username,
          email: user.email,
          gender: user.gender,
          credit: user.credit,
          role: user.role,
          user_id: user.user_id
        }
      });
      res.end();
    }
  });

  //res.status(200).end()
  // check DB for All Credentials:
});
// ----- AUTH: Save all crdentials: ------------------
app.post('/auth/signup', function (req, res) {
  var _req$body$credentials2 = req.body.credentials,
      email = _req$body$credentials2.email,
      password = _req$body$credentials2.password;

  console.log('Server Auth User: ', email);
  if (!email || !password) {
    res.status(400).json({ errors: { global: 'Missing Credentials' } });
    return;
  }
  // ------ Encrypt and send to API: --------------------
  _bcryptNodejs2.default.hash(password, _bcryptNodejs2.default.genSalt(8, function () {}), null, function (err, hash) {
    db.signUpUser({ email: email, hash: hash }).then(function (result) {
      res.status(200).json(result);
    }).catch(function (err) {
      return res.status(500).json(err.message);
    });
  });
});
// ----------------------------------------------------------

app.post('/auth/user', function (req, res) {
  if (!req.body.email && !password) {
    res.status(400).send('You must input a valid email address and password');
    return;
  }
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;


  var user = users.find(function (u) {
    return u.email === email; // && u.password === password
  });

  if (!user) {
    res.status(401).send('User not found...');
    return;
  }

  var token = _jsonwebtoken2.default.sign({
    // Object to Encript and Save
    sub: user.id,
    username: user.username
    // Secrete key signe
  }, 'mysupersicrete', {/*Options: expiresIn: '3 Hours'*/});

  res.status(200).send({ access_token: token });
});

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
  console.log('cssssssw');
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id);
});

// === Root SERVER REndering ===========================================

app.get('/', function (req, res) {
  var lng = req.headers['accept-language'].split(',')[0].split('-')[0];
  console.log(lng);
  /*
    const store = {}
    const params = {
    entry: ENTRY
  }
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <Route component={App} />
        </StaticRouter>
      </Provider>
    )
    const iState = {
      lan: lng
    }
  */
  //res.send(template(params, markup, iState))
  res.sendFile(_path2.default.join(__dirname, ENTRY));
});

var server = app.listen(PORT, function () {
  console.log('Server running on: ', PORT);
});
//# sourceMappingURL=index.js.map