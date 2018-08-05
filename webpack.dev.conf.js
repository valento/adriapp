import webpack from 'webpack'
import path from 'path'

export default {

  devtool: 'eval-source-map',
  mode: 'development',
  entry:
  [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    path: '/',
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
