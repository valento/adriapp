'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _locations = require('../api/locations');

var _locations2 = _interopRequireDefault(_locations);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

var dataRouter = _express2.default.Router();
var db = new _locations2.default(process.env.DB);

dataRouter.use(_bodyParser2.default.json());
dataRouter.use(_bodyParser2.default.urlencoded({ extended: true }));

dataRouter.get('/locations', function (req, res) {
  db.fetchLocations('locations').then(function (result) {
    return res.status(200).json(result);
  }).catch(function (err) {
    return console.log(err);
  });
});

exports.default = dataRouter;
//# sourceMappingURL=data.js.map