const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
			template:'./src/newchat.html'
		}),
	]
};

