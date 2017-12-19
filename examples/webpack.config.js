const path = require('path');

module.exports = {
  entry: {
    components: './components.js'
  },
  devtool: 'source-map',
  devServer: {
    inline: false,
    open: true
  },
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
      },
      {
        test: /\.twig$/,
        use: [
          { loader: 'twig-loader' },
          { loader: path.resolve('loader.js') }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ],
      }
    ]
  }
};
