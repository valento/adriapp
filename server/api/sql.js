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
      this.db.run("CREATE TABLE if not exists users (" +
      "id VARCHAR," +
      "email VARCHAR," +
      "password VARCHAR(12)," +
      "verifyed INTEGER," +
      "first TEXT," +
      "last TEXT," +
      "username VARCHAR," +
      "gender INTEGER," +
      "credit REAL," +//20 initial, buy on PayPal
      "rating REAL," +
      "role INTEGER," +//access permissions
      "location VARCHAR(12)," +// Lat,Lng
      "country VARCHAR(8)," +
      "id_kickstart VARCHAR," +//access to LiveParty content
      "id_indie VARCHAR," +//access to LiveParty content
      "id_insta VARCHAR," +//passport-session
      "id_fb VARCHAR," +//passport-session
      "refs VARCHAR" +// referential program ??: How To
      ");")
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

SQL.prototype.locations = function(table) {
  //
}

// On Sign Up record --------------------------------------
SQL.prototype.signUpUser = function(data) {
  console.log(data.hash)
  let first = '',
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
    let q = "INSERT INTO users (email, password, role, credit, verifyed, first, last)" +
                    "VALUES ($email, $password, $role, $credit, $verifyed, $first, $last)"
    let params = {
      $email: data.email,
      $password: data.hash,
      $role: (data.email === 'valentin.mundrov@gmail.com' || data.email === 'iloveaquiles09@gmail.com') ? 10 : 0,
      $credit: 50,
      $verifyed: 0,
      $first: first,
      $last: last
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
