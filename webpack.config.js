const path = require('path');

module.exports = {
	entry: {
		sysx: './src/sysx.js',
		gui: './src/sysg.js'
	},
	
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/js')
	}
};