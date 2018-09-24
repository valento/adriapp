import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

//import React from 'react'
//import { Provider } from 'react-redux'
//import { renderToString } from 'react-dom/server'
//import { StaticRouter } from 'react-router'

import userRouter from './routes/user'
import authRouter from './routes/auth'
import dataRouter from './routes/data'

import { template } from './template'
/* -------------------------------------------------------------- */

let app = express()

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

// ==== USER DATA ROUTES ==========================
app.use('/user', userRouter)
// ==== AUTHORIZATION ROUTES ==========================
app.use('/auth', authRouter)
// ==== TIMELINE ROUTES ==========================
app.use('/data', dataRouter)
// ----------------------------------------------------------

app.get('/client/css/img/:id', (req,res) => {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id)
})
app.get('/dist/img/:id', (req,res) => {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + 'adriapp' + '/' + req.params.id)
})

// === ENTRY Route ===========================================
app.get('*', (req,res) => {
  lng = req.headers['accept-language'].split(',')[0].split('-')[0]
  const lan = (lng.match(/^(es)/))? 'es' : 'en'
  const params = {
    ln: lan,
    env: ENV
  }
  const markup = template(params)
  res.send(markup)
// --- SERVER Rendering ------------------------------------

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
