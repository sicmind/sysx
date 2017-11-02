const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'sysx.js',
		path: path.resolve(__dirname, 'dist/js')
	}
};