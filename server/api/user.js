import SQLite from 'sqlite3'
import fs from 'fs'

function database(url, table) {
  try {
    fs.stat(url, (err,res) => {
      if(err){
        throw err
      } else {
        this.db = new SQLite.Database(url, err => {
          if(!err) console.log('Users DB: Success')
          if(table) {
            //this.init(table)
          }
        })
      }
    })
  }
  catch(err) {
    console.log('Wrong DB: ' + err.message)
  }
}

database.prototype.init = function(table) {
  switch(table) {
    case 'users' :
      this.db.serialize(
        () => {
          this.db.run("CREATE TABLE if not exists users (" +
          "user_id INTEGER PRIMARY KEY NOT NULL," +
          "email VARCHAR NOT NULL UNIQUE," +
          "password VARCHAR NOT NULL UNIQUE," +
          "verifyed INTEGER DEFAULT 0," +
          "first TEXT," +
          "last TEXT," +
          "username VARCHAR," +
          "gender INTEGER," +
          "lastlog INTEGER," +// DATE: last login date to calculate rating/activitie
          "credit REAL DEFAULT 10," +//20 initial, buy on PayPal
          "payment_metod INTEGER," +// default payment metod
          "rating REAL DEFAULT 10," +
          "role VARCHAR(4) DEFAULT 1000," +//role access permissions
          "location VARCHAR(12)," +// Lat,Lng
          "country VARCHAR(5)," +
          "likes REAL DEFAULT 0," +
          "id_kickstart VARCHAR," +//access to LiveParty content
          "id_indie VARCHAR," +//access to LiveParty content
          "id_insta VARCHAR," +//passport-session
          "id_fb VARCHAR," +//passport-session
          "refs VARCHAR" +// referential program ??: How To
          ");")

        const q = this.db.prepare("INSERT INTO users (user_id,email, gender, role, lastlog, credit)" +
                        "VALUES ($user_id, $email, $gender, $role, $lastlog, $credit)")
        const params = {
          $user_id: 100000001,
          $email: 'valentin.mundrov@gmail.com',
          $gender: 1,
          $role: 9999,
          $lastlog: Date.now(),
          $credit: 999
        }

      q.run(params)
      q.finalize()
    }
      //
    )

    break
    case 'events' :
      this.db.run("CREATE TABLE if not exists events (" +
        "id VARCHAR," +
        "state INTEGER," +//(0=promo, 1=confirmed-comingup, 2=LiveNow!, 3=onKickstarter)
        "event VARCHAR," +//(for LIVE: Time included)
        "location VARCHAR," +
        "venue VARCHAR," +
        "time VARCHAR" +
        ");")
    break
  }
}

// ------- Login: Check PASSWORD!!! ----------------
database.prototype.locations = function(table) {
  //
}

database.prototype.login = function(credentials) {
  //
}

// ------ Fetch User: ------------------------------
database.prototype.fetchOne = function(data = [], result_set = ['email']) {
  const that = this
  const sql = `SELECT ${result_set}, username FROM users WHERE email = ?`
  return new Promise ((resolve, reject) => {
    that.db.get(sql, [ data.email ], (err,row) => {
      if(err){
        reject(err)
      } else {
    //sqlite returns rows = array
        resolve(row)
      }
    })
  })

}

database.prototype.fetchById = function(data = [], result_set) {
  console.log(data)
  const that = this
  const sql = `SELECT ${result_set} FROM users WHERE user_id = ?`
  return new Promise ((resolve, reject) => {
    that.db.get(sql, [ data ], (err,row) => {
      if(err){
        reject(err)
      } else {
        console.log('DB returns: ' , row)
    //sqlite returns rows = array
        resolve(row)
      }
    })
  })

}

// ------ Update User Data: -----------------------------
database.prototype.updateUserData = function(data = [], update_set) {
  const update_fields = []
  for(var key in update_set.data){
    if(key !== 'user_id') {
      update_fields.push(`${key}=${update_set.data[key]}`)
    }
  }
  console.log('Object to update: ', update_fields)
  const that = this
  const sql = `UPDATE users SET ${update_fields} WHERE user_id = ?`
  return new Promise ((resolve, reject) => {
    this.db.run(sql, [ data.user_id ], function(err) {
      if(err){
        reject(err)
      } else {
        resolve()
      }
    })
  })

}

// On Sign Up record --------------------------------------
database.prototype.signUpUser = function(data) {
  let username = 'Anon',
      role = 1000,
      credit = 10,
      user_id = undefined
  if (data.email === 'valentin.mundrov@gmail.com') {
    username = 'Valento',
    user_id = 100000001,
    role = 9999,
    credit = 999
  } else if (data.email === 'iloveaquiles09@gmail.com') {
    username = 'Adri',
    user_id = 100000002,
    role = 9999,
    credit = 999
  }
  const that = this
  return new Promise((resolve,reject) => {
    if(!data) {
      reject('Nothing to save')
    }
    let q = "INSERT INTO users (user_id, username, email, password, role, credit)" +
                    "VALUES ($user_id, $username, $email, $password, $role, $credit)"
    let params = {
      $user_id: user_id,
      $username: username,
      $email: data.email,
      $password: data.hash,
      $role: role,
      $credit: credit
    }
    let stm = that.db.prepare(q)
    stm.run(params, err => {
      if(err){
        if(this.changes == 0) {
          reject('Nothing saved')
        }
        reject(err.message)
      }
      else {
        console.log(data)
        resolve(data)
      }
    })
    stm.finalize()
  })
}

export default database
