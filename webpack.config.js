const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		path:path.resolve(__dirname,'dist'),
		filename: 'js/bundle.js'
	},
	devServer:{
		contentBase:"./dist"
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template:'./src/newchat.html'
		}),
	]
};

module.exports = {
	entry: './src/js/auth.js',
	output: {
		path:path.resolve(__dirname,'dist'),
		filename: 'js/authBundle.js'
	},
	devServer:{
		contentBase:"./dist"
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template:'./src/newchat.html'
		}),
	]
};