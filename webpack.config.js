const path = require('path');

const config = {
	entry: ['@babel/polyfill', './src/index.js'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'main.js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		compress: true,
		port: 3000,
	},
	devtool: 'source-map',
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

module.exports = config;