const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.development.config.js');
const PATHS = require('./paths');

const build = devPort => {
  let bundleStart = null;
  const compiler = webpack(webpackConfig);

  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', () => {
    const ms = Date.now() - bundleStart;
    console.log(`Bundled in ${ms} ms!`);
    console.log(`See app at: localhost:${devPort}`)
  });

  const bundler = new webpackDevServer(compiler, {
    publicPath: '/build/',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    },
    historyApiFallback: true,
    contentBase: PATHS.PUBLIC
  });

  bundler.listen(devPort, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
};

build(8080);
