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
          if (!err) console.log('Users DB: Success');
        });
      }
    });
  } catch (err) {
    console.log('Wrong DB: ' + err.message);
  }
}

// ------- Login: Check PASSWORD!!! ----------------
database.prototype.locations = function (table) {
  //
};

database.prototype.login = function (credentials) {}
//


// ------ Fetch User: ------------------------------
;database.prototype.fetchOne = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var result_set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['email'];

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

database.prototype.fetchById = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var result_set = arguments[1];

  console.log(data);
  var that = this;
  var sql = 'SELECT ' + result_set + ' FROM users WHERE user_id = ?';
  return new Promise(function (resolve, reject) {
    that.db.get(sql, [data], function (err, row) {
      if (err) {
        reject(err);
      } else {
        console.log('DB returns: ', row);
        //sqlite returns rows = array
        resolve(row);
      }
    });
  });
};

// ------ Update User Data: -----------------------------
database.prototype.updateUserData = function () {
  var _this2 = this;

  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var update_set = arguments[1];

  var update_fields = [];
  for (var key in update_set.data) {
    if (key !== 'user_id') {
      update_fields.push(key + '=' + update_set.data[key]);
    }
  }
  console.log('Object to update: ', update_fields);
  var that = this;
  var sql = 'UPDATE users SET ' + update_fields + ' WHERE user_id = ?';
  return new Promise(function (resolve, reject) {
    _this2.db.run(sql, [data.user_id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// On Sign Up record --------------------------------------
database.prototype.signUpUser = function (data) {
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
      reject('Nothing to save');
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

exports.default = database;
//# sourceMappingURL=user.js.map