import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import template from './template'

import S3 from 'aws-sdk/clients/s3'
import userdb from './api/user'

import jwt from 'jsonwebtoken'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
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

// === TEST ===================
app.get('/auth/test', (req,res) => {
  //const { email } = req.query//req.body.credentials
  db.fetchOne( req.query )
  .then(result => {
    if(!result || undefined){
      res.status(400).json({errors: {
        global: 'Suscribe ya...'
      }})
    } else {
      res.status(200).json(result)
    }

  })
})

// === AUTH =============================================================

app.post('/auth/user', (req,res) => {
  const { email, password } = req.body.credentials
  console.log('Server Auth User: ', email)
  if(!email || !password) {
    res.status(400)
    .json({errors: { global: 'Missing Credentials' }})
    return
  }

  bcrypt.hash(password, bcrypt.genSalt(8,()=>{}), null, (err, hash) => {
    db.signUpUser({ email, hash })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => res.status(500).json(err.message))
  })

})
// ----------------------------------------------------------

app.post('/auth/login', (req,res) => {
  if(!req.body.email) {// && !password
    res.status(400)
    .send('You must input a valid email address and password')
    return
  }
  const {email} = req.body

  const user = users.find(u => {
    return u.email === email// && u.password === password
  })

  if(!user) {
    res.status(401).send('User not found...')
    return
  }

  const token = jwt.sign({
    // Object to Encript and Save
    sub: user.id,
    username: user.username
    // Secrete key signe
  }, 'mysupersicrete', {/*Options: expiresIn: '3 Hours'*/})

  res.status(200).send({access_token: token})
})

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
  console.log('cssssssw')
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id)
})

// === Root SERVER REndering ===========================================

app.get('/', (req,res) => {
  const lng = req.headers['accept-language'].split(',')[0].split('-')[0]
  console.log(lng)
/*
  const store = {}
  const params = {
  entry: ENTRY
}
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <Route component={App} />
      </StaticRouter>
    </Provider>
  )
  const iState = {
    lan: lng
  }
*/
  //res.send(template(params, markup, iState))
  res.sendFile(path.join(__dirname, ENTRY))
})

let server = app.listen(PORT, () => {
  console.log('Server running on: ', PORT)
})
