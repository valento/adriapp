'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _s = require('aws-sdk/clients/s3');

var _s2 = _interopRequireDefault(_s);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* -------------------------------------------------------------- */
var aws_conf = {
  bucket: 'adriapp',
  credentials: {
    secretAccessKey: '',
    accessKeyId: '',
    apiVersion: '2006-03-01',
    region: 'eu-central-1'
  }
};
var app = (0, _express2.default)();
//const s3 = new S3({})

var PORT = process.env.PORT || 8000;
var ENV = process.env.NODE_ENV || 'development';
console.log(ENV);
var ENTRY = ENV === 'production' ? '../dist/index.html' : '../client/index.html';

if (ENV === 'development') {
  /* ------ for in memory bundle -------------------------------------- */
  var wpConfig = require('../webpack.conf.js');
  var webpack = require('webpack');
  var wpMiddle = require('webpack-dev-middleware');
  var wpHot = require('webpack-hot-middleware');
  var compiler = webpack(wpConfig);
  app.use(wpMiddle(compiler, {
    hot: true
  }));
  app.use(wpHot(compiler));
} else {
  // PRODUCTION configuration
}

app.use('/client', _express2.default.static(_path2.default.join(__dirname, '../client')));
app.use('/dist', _express2.default.static(_path2.default.join(__dirname, '../dist')));
app.get('/client/public/css/img/:id', function (req, res) {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + aws_conf.bucket + '/' + req.params.id);
});

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, ENTRY));
});

var server = app.listen(PORT, function () {
  console.log('Server running on: ', PORT);
});
//# sourceMappingURL=index.js.map