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

// === TEST ===================
app.get('/test/data/', function (req, res) {
  //const { email } = req.query//req.body.credentials
  db.fetchOne(req.query).then(function (result) {
    if (!result || undefined) {
      res.status(400).json({ errors: {
          global: 'Suscribe ya...'
        } });
    } else {
      res.status(200).json(result);
    }
  });
});

// === AUTH =============================================================

app.post('/auth/user', function (req, res) {
  var _req$body$credentials = req.body.credentials,
      email = _req$body$credentials.email,
      password = _req$body$credentials.password;

  console.log(email);
  //if(!email || !password) {
  res.status(400).json({ errors: { global: 'Invalid Credentials' } });
  return;
  //}
  /*
    const user = db.fetchOne(u => {
      return u.email === email// && u.password === password
    })
    bcrypt.hash(password, bcrypt.genSalt(8,()=>{}), null, (err, hash) => {
      db.signUpUser({email,hash})
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json(err.message))
    })
  */
});
// ----------------------------------------------------------

app.post('/auth/login', function (req, res) {
  if (!req.body.email) {
    // && !password
    res.status(400).send('You must input a valid email address and password');
    return;
  }
  var email = req.body.email;


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