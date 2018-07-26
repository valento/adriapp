import express from 'express'
import path from 'path'
/* ------ for bundle ------------------------------------------ */
import webpack from 'webpack'
import wpMiddle from 'webpack-dev-middleware'
import wpHot from 'webpack-hot-middleware'
import wpConfig from '../webpack.dev.conf.js'
/* ----   ----------------------------- */

let app = express()

const PORT = process.env.PORT || 8000
const ENV = process.env.NODE_ENV || 'development'

if(ENV === 'development'){
  const compiler = webpack(wpConfig)
  //app.use(wpMiddle(compiler, {
    //hot: true
  //}))
} else {
  // PRODUCTION configuration
}


app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

let server = app.listen(PORT, () => {
  console.log('Server running on: ', PORT)
})
