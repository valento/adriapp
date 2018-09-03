import SQLite from 'sqlite3'
import fs from 'fs'

function userdb(url, table) {
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

userdb.prototype.init = function(table) {
  switch(table) {
    case 'users' :
    this.db.serialize(
      () => {
        this.db.run("CREATE TABLE if not exists users (" +
        "id VARCHAR," +
        "email VARCHAR," +
        "password VARCHAR(12)," +
        "verifyed INTEGER," +
        "first TEXT," +
        "last TEXT," +
        "username VARCHAR," +
        "gender INTEGER," +
        "lastlog INTEGER," +// DATE: last login date to calculate rating/activitie
        "credit REAL," +//20 initial, buy on PayPal
        "payment_metod INTEGER," +// default payment metod
        "rating REAL," +
        "role VARCHAR(4)," +//role access permissions
        "location VARCHAR(12)," +// Lat,Lng
        "country VARCHAR(8)," +
        "id_kickstart VARCHAR," +//access to LiveParty content
        "id_indie VARCHAR," +//access to LiveParty content
        "id_insta VARCHAR," +//passport-session
        "id_fb VARCHAR," +//passport-session
        "refs VARCHAR" +// referential program ??: How To
        ");")

      const q = this.db.prepare("INSERT INTO users (email,gender,role,lastlog,credit,verifyed)" +
                      "VALUES ($email, $gender, $role, $lastlog, $credit, $verifyed)")
      const params = {
        $email: 'valentin.mundrov@gmail.com',
        $gender: 1,
        $role: 9999,
        $lastlog: Date.now(),
        $credit: 1000,
        $verifyed: true
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

userdb.prototype.locations = function(table) {
  //
}

//Login Fetch User:
userdb.prototype.fetchOne = function(data = []) {
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
userdb.prototype.signUpUser = function(data) {
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
    let q = "INSERT INTO users (email, password, role, credit, verifyed)" +
                    "VALUES ($email, $password, $role, $credit, $verifyed)"
    let params = {
      $email: data.email,
      $password: data.hash,
      $role: (data.email === 'valentin.mundrov@gmail.com' || data.email === 'iloveaquiles09@gmail.com') ?
      9999 : 0,
      $credit: (data.email === 'valentin.mundrov@gmail.com' || data.email === 'iloveaquiles09@gmail.com') ?
      0 : 50,
      $verifyed: 0
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

export default userdb
