import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

//import React from 'react'
//import { Provider } from 'react-redux'
//import { renderToString } from 'react-dom/server'
//import { StaticRouter } from 'react-router'
import {template} from './template'
//
//import S3 from 'aws-sdk/clients/s3'
import userdb from './api/user'

import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt-nodejs'
/* -------------------------------------------------------------- */
const users = []

// ==== PASSPORT ============================================
/*
passport.use(new LocalStrategy((user, done) => {
  //
}))
*/
// ==========================================================

let app = express()

let db = new userdb('./data/aapp.db', 'users')
//const s3 = new S3({})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let lng
const PORT = process.env.PORT || 8000
const ENV = process.env.NODE_ENV || 'development'
console.log(ENV)
const ENTRY = ENV === 'production' ? '../dist/index.html' : '../client/index.html'

if(ENV === 'development'){
/* ------ IN MEMORY bundle configuration ---------------------------- */
  const wpConfig = require('../webpack.conf.js')(ENV)
  const webpack = require('webpack')
  const wpMiddle = require('webpack-dev-middleware')
  const wpHot = require('webpack-hot-middleware')
  const compiler = webpack(wpConfig)
  app.use(wpMiddle(compiler, {
    hot: true
  }))
  app.use(wpHot(compiler))
  app.use('/client', express.static(path.join(__dirname, '../client')))
} else {
  // PRODUCTION configuration
  app.use('/dist', express.static(path.join(__dirname, '../dist')))
}
/*
app.use('/user/data/', (req,res) => {
  if(!req.headers.authorization) {
    res.status(400).json({errors: {
      global: 'Unauthorized request! Login first..'
    }})
  } else {
    next()
  }
})
*/

// ==== AUTHORIZATION ROOTS ==========================
// ---- Get User Data: ------------------------------
app.get('/user/data/:user_id', (req,res) =>{
  var data = ['username','gender','credit','role']
  db.fetchById( req.params , data ).then( user => {
    res.status(200).json({
      user: {
        username: user.username,
        credit: user.credit,
        role: Number(user.role),
        gender: (user.gender !== null) ? user.gender : -1
      }
    })
  })
  .catch( error => console.log(error.message))
})

// ---- Save User Data: ------------------------------

app.post('/user/data/:user_id', (req,res) => {
  const { data } = req.body.data
  console.log(data)
  db.updateUserData(req.params, { data }).then((err,user) => {
    if(err){
      res.status(400).json({
        errors: {
          global: err.msg
        }
      })
    } else {
      res.status(200).json({
        message: {
          globals: 'Data saved successfully...'
        }
      })
    }
  })
})

// ==== Check: if user-email exist ===================
app.get('/auth/test', (req,res) => {
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
      const msg = (lng === 'es') ?
        ('Como estas, mi ' + result.username + '!') :
        ('Hello, dear ' + result.username + '!')
      res.status(200).json( {message: { global: msg } })
    }

  })
})
// ----- AUTH: Signup with crdentials: ----------------
app.post('/auth/login', (req,res) => {
  const { email, password } = req.body.credentials
  let msg
  if(!email || !password) {
    msg = (lng === 'es') ?
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
        user_id: user.user_id
      }, 'mysecrethere')
      res.status(200).json({
        user: {
          token: token,
          username: user.username,
          gender: user.gender,
          credit: user.credit,
          role: user.role,
          user_id: user.user_id
        }
      })
    } else {
      msg = (lng === 'es') ?
        ('Credenciales Incorrectos...') :
        ('Wrong Credentials...')
      res.status(400).json({errors: {global: msg}})
    }
  })
})
// ----- AUTH: Save all crdentials: ------------------
app.post('/auth/signup', (req,res) => {
  const { email, password } = req.body.credentials
  let msg
  console.log('Server Auth User: ', email)
  if(!email || !password) {
    msg = (lng === 'es') ?
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
          user_id: user.user_id
        }, 'mysecrethere')
        res.status(200).json({
          user: {
            token: token,
            username: user.username,
            gender: user.gender,
            credit: user.credit,
            role: user.role,
            user_id: user.user_id
          }
        })
      })
    })
    .catch(err => res.status(500).json( {errors: { global: err.message }} ))
  })

})
// ----------------------------------------------------------
/*
app.post('/auth/user', (req,res) => {

  const token = jwt.sign({
    // Object to Encript and Save
    sub: user.id,
    username: user.username
    // Secrete key signe
  }, 'mysupersecrete', expiresIn: '3 Hours')

  res.status(200).send({access_token: token})
})
*/

/*
app.use((req,res) => {
  //if(req.cookie.authenticated)
})
*/

// ================================================================
app.get('/client/css/img/:id', (req,res) => {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id)
})
app.get('/dist/img/:id', (req,res) => {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id)
})

// === Root SERVER REndering ===========================================

app.get('*', (req,res) => {
  lng = req.headers['accept-language'].split(',')[0].split('-')[0]
  const lan = (lng.match(/^(es)/))? 'es' : 'en'
  const params = {
    ln: lan
  }
  const markup = template(params)
  res.send(markup)
  //res.set({'Content-Language': lan}).sendFile(path.join(__dirname, ENTRY))

//  const store = {}
//  const params = {
//  entry: ENTRY
//}
//  const markup = renderToString(
//    <Provider store={store}>
//      <StaticRouter location={req.url}>
//        <Route component={App} />
//      </StaticRouter>
//    </Provider>
//  )
//  const iState = {
//    lan: lng
//  }

  //res.send(template(params, markup, iState))
})

let server = app.listen(PORT, () => {
  console.log('Server running on: ', PORT)
})
