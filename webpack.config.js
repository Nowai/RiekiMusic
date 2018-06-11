var webpack = require('webpack');
var path = require('path');

// environment variables
const env = process.env.WEBPACK_ENV;

// meta-data
var projectName = 'riekimusic';
var outputFileName = env == 'build' ? projectName + '.min.js' : projectName + '.js';

var config = {
  entry: ['babel-polyfill','./src/index.jsx'],
  devtool: env === 'dev' ? 'eval-source-map' : false,
  output: {
    path: __dirname + '/build/',
    filename: outputFileName
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: env === 'build'
    })
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-2', 'stage-1']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$|\.sass$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader',
          options: {
            includePaths: [
              path.resolve(__dirname, './src/styles'),
              path.resolve(__dirname, './node_modules/normalize-scss/sass')
            ]
          }}
        ]
      }
    ]
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
      './src',
      './src/components',
      './src/views',
      './src/actions',
      './src/utils'
    ],
    alias: {
      actions: path.resolve( __dirname, 'src/actions/'),
      reducers: path.resolve( __dirname, 'src/reducers/'),
      storeConfiguration: path.resolve( __dirname, 'src/store/storeConfiguration'),
      applicationStyles: path.resolve( __dirname, 'src/styles/app.scss')
    },
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;
