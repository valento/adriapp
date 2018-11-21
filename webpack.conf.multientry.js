const webpack = require('webpack')
const path = require('path')

module.exports = ( env ) => {
  console.log('multi: ', env.MULTIENTRY)
  return {
    devtool: 'eval-source-map',
    mode: env.prod ? 'production' : 'development',
    entry: env.prod ? {
      present: './client/present.js'
    } : {
      index: ['./client/index.js','webpack-hot-middleware/client'],
      present: ['./client/present.js','webpack-hot-middleware/client']
    },
    output: env.prod ? {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'bundle.[name].js'
    } : {
      path: __dirname,
      publicPath: '/',
      filename: '[name].js'
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
              options: {
                  presets: ['babel-preset-env','babel-preset-react'],
                  plugins: ['transform-object-rest-spread']
                }
            }
          ]
        },
        ///*
        {
          test: /\.css$/,
          include: path.join(__dirname, 'client'),
          loaders: [
            {loader: 'style!css!'}
          ]
        }
        //*/
      ]
    },
    resolve: {
      extensions: ['.js', '.css']
    }
  }
}
