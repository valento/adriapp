'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require('sqlite3');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function database(url, table) {
  var _this = this;

  try {
    _fs2.default.stat(url, function (err, res) {
      if (err) {
        throw err;
      } else {
        _this.db = new _sqlite2.default.Database(url, function (err) {
          if (!err) console.log('Locations DB: Success');
          if (table) {
            //this.init(table)
          }
        });
      }
    });
  } catch (err) {
    console.log('Wrong DB: ' + err.message);
  }
}

database.prototype.fetchLocations = function (table) {
  var _this2 = this;

  var sql = 'SELECT location, location_id FROM ' + table + ' ORDER BY location';
  return new Promise(function (resolve, reject) {
    _this2.db.all(sql, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.default = database;
//# sourceMappingURL=locations.js.map