const path = require('path');
const nodeExternals = require('webpack-node-externals')

const client = {
	devtool: 'source-map',
	entry: ['@babel/polyfill', './src/app/index.js'],
	output: {
		path: path.resolve(__dirname, 'build/app'),
		filename: 'main.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-react', '@babel/preset-env'],
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
		path: path.resolve(__dirname, 'build'),
		filename: 'server.js',
		publicPath: '/',
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
					presets: ['@babel/preset-react', '@babel/preset-env'],
				},
			},
		],
	}
};

module.exports = [
	client,
	server
];