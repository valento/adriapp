import SQLite from 'sqlite3'
import fs from 'fs'

function SQL(url, table) {
  try {
    fs.stat(url, (err,res) => {
      if(err){
        throw err
      } else {
        this.db = new SQLite.Database(url, err => {
          if(!err) console.log('DB: Success')
          if(table) {
            this.init(table)
          }
        })
      }
    })
  }
  catch(err) {
    console.log('Wrong DB: ' + err.message)
  }
}

SQL.prototype.init = function(table) {
  switch(table) {
    case 'users' :
    this.db.serialize(
      () => {
        this.db.run("CREATE TABLE if not exists users (" +
        "user_id INTEGER PRIMARY KEY NOT NULL," +
        "email VARCHAR NOT NULL UNIQUE," +
        "password VARCHAR(12) NOT NULL UNIQUE," +
        "verified INTEGER DEFAULT 0," +
        "first TEXT," +
        "last TEXT," +
        "username TEXT," +
        "gender INTEGER," +
        "lastlog INTEGER," +// DATE: last login date to calculate rating/activitie
        "credit REAL default 10," +//20 initial, buy on PayPal
        "payment_metod INTEGER," +// default payment metod
        "rating REAL DEFAULT 0," +
        "role VARCHAR(4) default 1000," +//role access permissions
        "location VARCHAR(12)," +// Lat,Lng
        "country VARCHAR(5)," +
        "likes REAL DEFAULT 0," +
        "id_kickstart VARCHAR," +//access to LiveParty content
        "id_indie VARCHAR," +//access to LiveParty content
        "id_insta VARCHAR," +//passport-session
        "id_fb VARCHAR," +//passport-session
        "refs VARCHAR" +// referential program ??: How To
        ");")

      const q = this.db.prepare("INSERT INTO users (user_id, email,gender,role,lastlog,credit,verifed)" +
                      "VALUES ($user_id, $email, $gender, $role, $lastlog, $credit, $verifyed)")
      const params = {
        $user_id: 100000001,
        $email: 'valentin.mundrov@gmail.com',
        $gender: 1,
        $role: 9999,
        $lastlog: Date.now(),
        $credit: 999,
        $verified: true
      }

      q.run(params)
      q.finalize()
    }
      //
    )

    break
    case 'events' :
      this.db.run("CREATE TABLE if not exists events (" +
        "state INTEGER," +//(0=promo, 1=confirmed-comingup, 2=LiveNow!, 3=onKickstarter)
        "event VARCHAR," +//(for LIVE: Time included)
        "location VARCHAR," +
        "venue VARCHAR," +
        "time VARCHAR" +
        ");")
    break
  }
}

SQL.prototype.locations = function(table) {
  //
}

//Login Fetch User:
SQL.prototype.fetchOne = function(data = []) {
  console.log(data)
  const that = this
  const sql = `SELECT rowid, gender FROM users WHERE email = ?`
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

// On Sign Up record --------------------------------------
SQL.prototype.signUpUser = function(data) {
  console.log(data.hash)
  let first = 'Anon',
      last = ''
  if (data.mail === 'valentin.mundrov@gmail.com') {
    first = 'valentin'
    last = 'mundrov'
  } else if (data.mail === 'iloveaquiles09@gmail.com') {
    first = 'adriana'
    last = 'perez'
  }
  const that = this
  return new Promise((resolve,reject) => {
    if(!data) {
      throw new TypeError('Empty Object provided for Save')
    }
    let q = "INSERT INTO users (user_id, email, password, role, credit, verifyed)" +
                    "VALUES ($user_id, $email, $password, $role, $credit, $verifyed)"
    let params = {
      $user_id: 100000001,
      $email: data.email,
      $password: data.hash,
      $role: (data.email === 'valentin.mundrov@gmail.com' || data.email === 'iloveaquiles09@gmail.com') ?
      9999 : 1000,
      $credit: (data.email === 'valentin.mundrov@gmail.com' || data.email === 'iloveaquiles09@gmail.com') ?
      999 : 10,
      $verified: 0
    }
    let stm = that.db.prepare(q)
    stm.run(params, err => {
      if(err){
        if(this.changes == 0) {
          reject(new Error('Nothing saved'))
        }
        reject(err.message)
      }
      else {
        resolve()
      }
    })
  })
}

export default SQL
