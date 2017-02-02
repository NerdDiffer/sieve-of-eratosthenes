const webpack = require('webpack');
const PATHS = require('./paths');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server', // hot reloading url
    'webpack-dev-server/client?http://localhost:8080', // inline loading url
    `${PATHS.SRC}/index.jsx`,
  ],
  output: {
    path: PATHS.BUILD,
    publicPath: 'build',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        loader: 'babel',
        include: PATHS.SRC,
        test: /\.jsx?/,
        query: {
          cacheDirectory: true
        }
      }
    ]
  }
};
