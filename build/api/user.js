'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require('sqlite3');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function userdb(url, table) {
  var _this = this;

  try {
    _fs2.default.stat(url, function (err, res) {
      if (err) {
        throw err;
      } else {
        _this.db = new _sqlite2.default.Database(url, function (err) {
          if (!err) console.log('DB: Success');
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

userdb.prototype.init = function (table) {
  var _this2 = this;

  switch (table) {
    case 'users':
      this.db.serialize(function () {
        _this2.db.run("CREATE TABLE if not exists users (" + "user_id INTEGER PRIMARY KEY NOT NULL," + "email VARCHAR NOT NULL UNIQUE," + "password VARCHAR NOT NULL UNIQUE," + "verifyed INTEGER DEFAULT 0," + "first TEXT," + "last TEXT," + "username VARCHAR," + "gender INTEGER," + "lastlog INTEGER," + // DATE: last login date to calculate rating/activitie
        "credit REAL DEFAULT 10," + //20 initial, buy on PayPal
        "payment_metod INTEGER," + // default payment metod
        "rating REAL DEFAULT 10," + "role VARCHAR(4) DEFAULT 1000," + //role access permissions
        "location VARCHAR(12)," + // Lat,Lng
        "country VARCHAR(5)," + "likes REAL DEFAULT 0," + "id_kickstart VARCHAR," + //access to LiveParty content
        "id_indie VARCHAR," + //access to LiveParty content
        "id_insta VARCHAR," + //passport-session
        "id_fb VARCHAR," + //passport-session
        "refs VARCHAR" + // referential program ??: How To
        ");");

        var q = _this2.db.prepare("INSERT INTO users (user_id,email, gender, role, lastlog, credit)" + "VALUES ($user_id, $email, $gender, $role, $lastlog, $credit)");
        var params = {
          $user_id: 100000001,
          $email: 'valentin.mundrov@gmail.com',
          $gender: 1,
          $role: 9999,
          $lastlog: Date.now(),
          $credit: 999
        };

        q.run(params);
        q.finalize();
      }
      //
      );

      break;
    case 'events':
      this.db.run("CREATE TABLE if not exists events (" + "id VARCHAR," + "state INTEGER," + //(0=promo, 1=confirmed-comingup, 2=LiveNow!, 3=onKickstarter)
      "event VARCHAR," + //(for LIVE: Time included)
      "location VARCHAR," + "venue VARCHAR," + "time VARCHAR" + ");");
      break;
  }
};

// ------- Login: Check PASSWORD!!! ----------------
userdb.prototype.locations = function (table) {
  //
};

userdb.prototype.login = function (credentials) {}
//


// ------ Fetch User: ------------------------------
;userdb.prototype.fetchOne = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var result_set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['email'];

  console.log('DB: check this email: ', data);
  var that = this;
  var sql = 'SELECT ' + result_set + ', username FROM users WHERE email = ?';
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
userdb.prototype.signUpUser = function (data) {
  var _this3 = this;

  var username = 'Anon',
      role = 1000,
      credit = 10,
      user_id = undefined;
  if (data.email === 'valentin.mundrov@gmail.com') {
    username = 'Valento', user_id = 100000001, role = 9999, credit = 999;
  } else if (data.email === 'iloveaquiles09@gmail.com') {
    username = 'Adri', user_id = 100000002, role = 9999, credit = 999;
  }
  var that = this;
  return new Promise(function (resolve, reject) {
    if (!data) {
      throw new TypeError('Empty Object provided for Save');
    }
    var q = "INSERT INTO users (user_id, username, email, password, role, credit)" + "VALUES ($user_id, $username, $email, $password, $role, $credit)";
    var params = {
      $user_id: user_id,
      $username: username,
      $email: data.email,
      $password: data.hash,
      $role: role,
      $credit: credit
    };
    var stm = that.db.prepare(q);
    stm.run(params, function (err) {
      if (err) {
        if (_this3.changes == 0) {
          reject('Nothing saved');
        }
        reject(err.message);
      } else {
        console.log(data);
        resolve(data);
      }
    });
    stm.finalize();
  });
};

exports.default = userdb;
//# sourceMappingURL=user.js.map