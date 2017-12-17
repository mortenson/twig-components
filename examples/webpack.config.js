module.exports = {
  entry: './components.js',
  devtool: 'source-map',
  output: {
    filename: 'components.es5.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }
        }
      }
    ]
  }
};
