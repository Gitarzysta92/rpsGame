const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const plugins = [
	new HtmlWebpackPlugin({
		template: './src/index.html',
		filename: 'index.html',
		inject: 'body'
	})
]


module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [
					{	
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: false,
							sourceMap: true
						}
					},
					{	
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: plugins
}