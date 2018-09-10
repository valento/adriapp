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
  var _this2 = this;

  switch (table) {
    case 'users':
      this.db.serialize(function () {
        _this2.db.run("CREATE TABLE if not exists users (" + "user_id INTEGER PRIMARY KEY NOT NULL," + "email VARCHAR NOT NULL UNIQUE," + "password VARCHAR(12) NOT NULL UNIQUE," + "verified INTEGER DEFAULT 0," + "first TEXT," + "last TEXT," + "username TEXT," + "gender INTEGER," + "lastlog INTEGER," + // DATE: last login date to calculate rating/activitie
        "credit REAL default 10," + //20 initial, buy on PayPal
        "payment_metod INTEGER," + // default payment metod
        "rating REAL DEFAULT 0," + "role VARCHAR(4) default 1000," + //role access permissions
        "location VARCHAR(12)," + // Lat,Lng
        "country VARCHAR(5)," + "likes REAL DEFAULT 0," + "id_kickstart VARCHAR," + //access to LiveParty content
        "id_indie VARCHAR," + //access to LiveParty content
        "id_insta VARCHAR," + //passport-session
        "id_fb VARCHAR," + //passport-session
        "refs VARCHAR" + // referential program ??: How To
        ");");

        var q = _this2.db.prepare("INSERT INTO users (user_id, email,gender,role,lastlog,credit,verifed)" + "VALUES ($user_id, $email, $gender, $role, $lastlog, $credit, $verifyed)");
        var params = {
          $user_id: 100000001,
          $email: 'valentin.mundrov@gmail.com',
          $gender: 1,
          $role: 9999,
          $lastlog: Date.now(),
          $credit: 999,
          $verified: true
        };

        q.run(params);
        q.finalize();
      }
      //
      );

      break;
    case 'events':
      this.db.run("CREATE TABLE if not exists events (" + "state INTEGER," + //(0=promo, 1=confirmed-comingup, 2=LiveNow!, 3=onKickstarter)
      "event VARCHAR," + //(for LIVE: Time included)
      "location VARCHAR," + "venue VARCHAR," + "time VARCHAR" + ");");
      break;
  }
};

SQL.prototype.locations = function (table) {}
//


//Login Fetch User:
;SQL.prototype.fetchOne = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  console.log(data);
  var that = this;
  var sql = 'SELECT rowid, gender FROM users WHERE email = ?';
  return new Promise(function (resolve, reject) {
    that.db.get(sql, [data.email], function (err, row) {
      if (err) {
        reject(err);
      } else {
        //sqlite returns rows = array
        resolve(row);
      }
    });
  });
};

// On Sign Up record --------------------------------------
SQL.prototype.signUpUser = function (data) {
  var _this3 = this;

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
    var q = "INSERT INTO users (user_id, email, password, role, credit, verifyed)" + "VALUES ($user_id, $email, $password, $role, $credit, $verifyed)";
    var params = {
      $user_id: 100000001,
      $email: data.email,
      $password: data.hash,
      $role: data.email === 'valentin.mundrov@gmail.com' || data.email === 'iloveaquiles09@gmail.com' ? 9999 : 1000,
      $credit: data.email === 'valentin.mundrov@gmail.com' || data.email === 'iloveaquiles09@gmail.com' ? 999 : 10,
      $verified: 0
    };
    var stm = that.db.prepare(q);
    stm.run(params, function (err) {
      if (err) {
        if (_this3.changes == 0) {
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