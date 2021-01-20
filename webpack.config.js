const webpack = require('webpack');
const path 		= require('path');

module.exports = {
	entry: {
		sysx: './src/sysx.js',
		gui: './src/sysg.js'
	},
	
	devServer:{
		inline: true,
		contentBase: './dist',
		port: 3000
	},
	
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/js'),
		publicPath: './dist/js/sysx.js'
  },
  mode: "development"
};