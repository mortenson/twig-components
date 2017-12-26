const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const module_config = {
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
};

module.exports = [
  {
    entry: [
      '../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader',
      '../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter',
      './components.js'
    ],
    output: {
      filename: 'dist/components.bundled.js'
    },
    devServer: {
      inline: false,
      open: true
    },
    module: module_config,
    plugins: [
      new MinifyPlugin()
    ]
  },
  {
    entry: [
      './components.js'
    ],
    output: {
      filename: 'dist/components.js'
    },
    externals: {
      'twig': 'Twig'
    },
    module: module_config,
    plugins: [
      new MinifyPlugin()
    ]
  },
  {
    entry: [
      './templates.js'
    ],
    output: {
      filename: 'dist/templates.js',
      libraryTarget: 'commonjs2'
    },
    module: module_config,
    target: 'node'
  }
];
