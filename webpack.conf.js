const webpack = require('webpack')
const path = require('path')

module.exports = ( env ) => {
  console.log(env)
  return {
    devtool: 'eval-source-map',
  //mode: env ? 'production' : 'development',
    entry: env ?
    {
      app: './client/index.js',
      fontawesome: [
        '@fortawesome/react-fontawesome',
        '@fortawesome/free-brands-svg-icons',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/fontawesome-svg-core'
      ]
    } :
    [
      'webpack-hot-middleware/client',
      './client/index.js'
    ],
    output: {
      path: env.prod ? path.resolve(__dirname, './dist') : '/',
      filename: env.prod ? 'bundle.[name].js' : '',
      publicPath: '/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.join(__dirname, 'client'),
          loaders: [
            {
              loader: 'babel-loader',
              options: {presets: ['babel-preset-env','babel-preset-react']}
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js']
    }
  }
}
