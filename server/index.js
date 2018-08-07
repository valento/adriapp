import express from 'express'
import path from 'path'
import S3 from 'aws-sdk/clients/s3'
/* -------------------------------------------------------------- */
const aws_conf = {
  bucket: 'adriapp',
  credentials: {
    secretAccessKey: '',
    accessKeyId: '',
    apiVersion: '2006-03-01',
    region: 'eu-central-1'
  }
}
let app = express()
//const s3 = new S3({})

const PORT = process.env.PORT || 8000
const ENV = process.env.NODE_ENV || 'development'
console.log(ENV)
const ENTRY = ENV === 'production' ? '../dist/index.html' : '../client/index.html'

if(ENV === 'development'){
/* ------ for in memory bundle -------------------------------------- */
  const wpConfig = require('../webpack.conf.js')(ENV)
  const webpack = require('webpack')
  const wpMiddle = require('webpack-dev-middleware')
  const wpHot = require('webpack-hot-middleware')
  const compiler = webpack(wpConfig)
  app.use(wpMiddle(compiler, {
    hot: true
  }))
  app.use(wpHot(compiler))
} else {
  // PRODUCTION configuration
}

app.use('/client', express.static(path.join(__dirname, '../client')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.get('/client/public/css/img/:id', (req,res) => {
  res.redirect(301, '//s3.eu-central-1.amazonaws.com/' + aws_conf.bucket + '/' + req.params.id)
})

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, ENTRY))
})

let server = app.listen(PORT, () => {
  console.log('Server running on: ', PORT)
})
