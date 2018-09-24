import express from 'express'
import database from '../api/user'
import bodyParser from 'body-parser'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import dotenv from 'dotenv'

dotenv.config({ silent: true })

const authRouter = express.Router({
  mergeParams: true
})
authRouter.use(bodyParser.json())
authRouter.use(bodyParser.urlencoded({extended: true}))

const db = new database(process.env.DB)
let lng
let lan
// ==== Check: if user-email exist ===================
authRouter.get('/test', (req,res) => {
  if(lng === undefined) {
    lng = req.headers['accept-language'].split(',')[0]
  } else {
    lan = (lng.match(/^(es)/))? 'es' : 'en'
  }
  console.log(lan)
  //const { email } = req.query//req.body.credentials
  db.fetchOne( req.query )
  .then(result => {
    if(!result || undefined){
  // If not: invite to subscribe
      res.status(400).json({
        errors: {
          global: 'Suscribe ya...'
        }
      })
    } else {
      const msg = (lan === 'es') ?
        ('Como estas, mi ' + result.username + '!') :
        ('Hello, dear ' + result.username + '!')
      res.status(200).json( {message: { global: msg } })
    }

  })
})
// ----- AUTH: Signup with crdentials: ----------------
authRouter.post('/login', (req,res) => {
  if(lng === undefined) {
    lng = req.headers['accept-language'].split(',')[0]
  } else {
    lan = (lng.match(/^(es)/))? 'es' : 'en'
  }
  console.log(lan)
  const { email, password } = req.body.credentials
  let msg
  if(!email || !password) {
    msg = (lan === 'es') ?
      ('Faltan Credenciales!') :
      ('Missing Credentials!')
    res.status(400).json({errors: { global: msg }})
    return
  }
  var data = ['email','password','username','gender','credit','role','user_id']
  db.fetchOne( { email }, data )
  .then( user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = jwt.sign({
        email: user.email,
        user_id: user.user_id,
        role: user.role
      }, process.env.JWT_SECRET)
      res.status(200).json({
        user: {
          token: token,
          username: user.username,
          gender: user.gender,
          credit: user.credit,
          role: user.role
        }
      })
    } else {
      msg = (lan === 'es') ?
        ('Credenciales Incorrectos...') :
        ('Wrong Credentials...')
      res.status(400).json({errors: {global: msg}})
    }
  })
})
// ----- AUTH: Save all crdentials: ------------------
authRouter.post('/signup', (req,res) => {
  if(lng === undefined) {
    lng = req.headers['accept-language'].split(',')[0]
  } else {
    lan = (lng.match(/^(es)/))? 'es' : 'en'
  }
  console.log(lan)
  const { email, password } = req.body.credentials
  let msg
  console.log('Server Auth User: ', email)
  if(!email || !password) {
    msg = (lan === 'es') ?
      ('Faltan Credenciales...') :
      ('Missing Credentials...')
    res.status(400).json({errors: { global: msg }})
    return
  }
  bcrypt.hash(password, bcrypt.genSalt(8,()=>{}), null, (err, hash) => {
    db.signUpUser({ email, hash })
    .then( data => {
  // !!!! Correct data set:
      const { email } = data
      var params = ['email','password','username','gender','credit','role','user_id']
      db.fetchOne( { email }, params )
      .then( user => {
        const token = jwt.sign({
          email: user.email,
          user_id: user.user_id,
          role: user.role
        }, process.env.JWT_SECRET)
        res.status(200).json({
          user: {
            token: token,
            username: user.username,
            gender: user.gender,
            credit: user.credit
          }
        })
      })
    })
    .catch(err => res.status(500).json( {errors: { global: err.message }} ))
  })

})

export default authRouter
