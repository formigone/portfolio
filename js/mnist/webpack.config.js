module.exports = {
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    path: `${__dirname}/../docs/js`,
    filename: 'hello-world.js'
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
        loader: 'style-loader!css-loader',
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
