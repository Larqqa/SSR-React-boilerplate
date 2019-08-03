const path = require('path');
const nodeExternals = require('webpack-node-externals');

const client = {

  // Map source files for better errors
  devtool: 'source-map',
  entry: ['@babel/polyfill', './src/app/index.js'],
  output: {
    path: path.join(__dirname, './build/app/'),
    filename: 'bundle.js',
  },
  devServer: {

    // Points to folder with static files
    contentBase: path.join(__dirname, './build/'),

    // For live reload
    watchContentBase: true,
    compress: true,

    // Enable proxy
    // Gets data served from express server running on port 3000 
    proxy: [
      {
        context: ['/'],
        target: 'http://localhost:3000',
        secure: false
      }
    ],
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env',
              {
                'targets': {
                  'node': '10'
                }
              }
            ]
          ],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      }
    ],
  }
};

const server = {
  devtool: 'source-map',
  entry: './src/server.js',
  output: {
    path: path.join(__dirname, './build/'),
    filename: 'server.js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env',
              {
                'targets': {
                  'node': '10'
                }
              }
            ]
          ],
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
          }
        }
      }
    ],
  }
};

module.exports = [client, server];