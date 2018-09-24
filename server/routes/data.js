import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import database from '../api/user'
import dotenv from 'dotenv'

dotenv.config({ silent: true })

const dataRouter = express.Router()
const db = new database(process.env.DB)

dataRouter.use(bodyParser.json())
dataRouter.use(bodyParser.urlencoded({extended: true}))

dataRouter.get('/locations', (req,res)=>{
  db.fetchLocations().then( result => res.status(200).json(result))
  .catch(
    err => console.log(err)
  )
})

export default dataRouter
