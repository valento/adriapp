import SQLite from 'sqlite3'
import fs from 'fs'

function database(url, table) {
  try {
    fs.stat(url, (err,res) => {
      if(err){
        throw err
      } else {
        this.db = new SQLite.Database(url, err => {
          if(!err) console.log('Locations DB: Success')
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

database.prototype.fetchLocations = function(table) {
  const sql = `SELECT location, location_id, loc_short, active, votes FROM ${table} ORDER BY location`
  return new Promise((resolve, reject) => {
    this.db.all(sql, (err,res) => {
      if(err){
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export default database
