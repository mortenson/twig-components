const path = require('path');

module.exports = [
  {
    entry: [
      '../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader',
      '../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter',
      './components.js'
    ],
    output: {
      filename: 'dist/components.js'
    },
    devtool: 'source-map',
    devServer: {
      inline: false,
      open: true
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
            { loader: 'raw-loader' },
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
  },
  {
    entry: [
      './templates.js'
    ],
    output: {
      filename: 'dist/templates.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.twig$/,
          use: [
            { loader: 'raw-loader' },
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
    },
    target: 'node'
  }
];
