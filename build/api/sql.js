'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require('sqlite3');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SQL(url, table) {
  var _this = this;

  try {
    _fs2.default.stat(url, function (err, res) {
      if (err) {
        throw err;
      } else {
        _this.db = new _sqlite2.default.Database(url, function (err) {
          if (!err) console.log('DB: Success');
          if (table) {
            _this.init(table);
          }
        });
      }
    });
  } catch (err) {
    console.log('Wrong DB: ' + err.message);
  }
}

SQL.prototype.init = function (table) {
  switch (table) {
    case 'users':
      this.db.run("CREATE TABLE if not exists users (" + "id VARCHAR," + "email VARCHAR," + "password VARCHAR(12)," + "verifyed INTEGER," + "first TEXT," + "last TEXT," + "username VARCHAR," + "gender INTEGER," + "credit REAL," + //20 initial, buy on PayPal
      "payment_metod INTEGER," + // default payment metod
      "rating REAL," + "role VARCHAR(4)," + //role access permissions
      "location VARCHAR(12)," + // Lat,Lng
      "country VARCHAR(8)," + "id_kickstart VARCHAR," + //access to LiveParty content
      "id_indie VARCHAR," + //access to LiveParty content
      "id_insta VARCHAR," + //passport-session
      "id_fb VARCHAR," + //passport-session
      "refs VARCHAR" + // referential program ??: How To
      ");");
      break;
    case 'events':
      this.db.run("CREATE TABLE if not exists events (" + "id VARCHAR," + "state INTEGER," + //(0=promo, 1=confirmed-comingup, 2=LiveNow!, 3=onKickstarter)
      "event VARCHAR," + //(for LIVE: Time included)
      "location VARCHAR," + "venue VARCHAR," + "time VARCHAR" + ");");
      break;
  }
};

SQL.prototype.locations = function (table) {}
//


// On Sign Up record --------------------------------------
;SQL.prototype.signUpUser = function (data) {
  var _this2 = this;

  console.log(data.hash);
  var first = 'Anon',
      last = '';
  if (data.mail === 'valentin.mundrov@gmail.com') {
    first = 'valentin';
    last = 'mundrov';
  } else if (data.mail === 'iloveaquiles09@gmail.com') {
    first = 'adriana';
    last = 'perez';
  }
  var that = this;
  return new Promise(function (resolve, reject) {
    if (!data) {
      throw new TypeError('Empty Object provided for Save');
    }
    var q = "INSERT INTO users (email, password, role, credit, verifyed, first, last)" + "VALUES ($email, $password, $role, $credit, $verifyed, $first, $last)";
    var params = {
      $email: data.email,
      $password: data.hash,
      $role: data.email === 'valentin.mundrov@gmail.com' || data.email === 'iloveaquiles09@gmail.com' ? 9999 : 0,
      $credit: data.email === 'valentin.mundrov@gmail.com' || data.email === 'iloveaquiles09@gmail.com' ? 0 : 50,
      $verifyed: 0,
      $first: first,
      $last: last
    };
    var stm = that.db.prepare(q);
    stm.run(params, function (err) {
      if (err) {
        if (_this2.changes == 0) {
          reject(new Error('Nothing saved'));
        }
        reject(err.message);
      } else {
        resolve();
      }
    });
  });
};

exports.default = SQL;
//# sourceMappingURL=sql.js.map