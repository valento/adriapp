'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _data = require('./routes/data');

var _data2 = _interopRequireDefault(_data);

var _template = require('./template');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* -------------------------------------------------------------- */

//import React from 'react'
//import { Provider } from 'react-redux'
//import { renderToString } from 'react-dom/server'
//import { StaticRouter } from 'react-router'

var app = (0, _express2.default)();

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

// ==== USER DATA ROUTES ==============================
app.use('/user', _user2.default);
// ==== AUTHORIZATION ROUTES ==========================
app.use('/auth', _auth2.default);
// ==== TIMELINE ROUTES ===============================
app.use('/data', _data2.default);
// ----------------------------------------------------------

app.get('/client/css/img/:id', function (req, res) {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id);
});
app.get('/dist/img/:id', function (req, res) {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id);
});

// === ENTRY Route ===========================================
app.get('*', function (req, res) {
  lng = req.headers['accept-language'].split(',')[0].split('-')[0];
  var lan = lng.match(/^(es)/) ? 'es' : 'en';
  var params = {
    ln: lan,
    env: ENV
  };
  var markup = (0, _template.template)(params);
  res.send(markup);
  // --- SERVER Rendering ------------------------------------

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