const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		auth: './src/js/auth.js',
		bundle: './src/js/index.js'
	},
	output: {
		path:path.resolve(__dirname,'dist'),
		filename: 'js/[name].js'
	},
	devServer:{
		contentBase:"./dist"
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template:'./src/master.html'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ 
					from: path.resolve(__dirname, 'src', 'css'),
					to: path.resolve(__dirname, 'dist', 'css')
				},
				{ 
					from: path.resolve(__dirname, 'src', 'images'),
					to: path.resolve(__dirname, 'dist', 'images')
				}
			]
		})
	]
};

