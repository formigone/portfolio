module.exports = {
  devtool: 'source-map',
  entry: {
    'hello-world': `${__dirname}/js/hello-world/app.js`,
    mnist: `${__dirname}/js/mnist/app.js`,
  },
  output: {
    path: `${__dirname}/docs/js`,
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          plugins: ['transform-es2015-spread'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1',
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['', '.js'],
  },
};
