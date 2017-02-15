import path from 'path';
import webpack from 'webpack';

export default {
	devtools: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '/managr_react/index.jsx')
	],

	output: {
		path: __dirname,
		filename: 'bundle.js',
		publicPath: '/'
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],

	module: {
		loaders: [
			{
				test: /\.jsx$/,
				include: path.join(__dirname, 'managr_react'),
				loaders: ['react-hot', 'babel']
			}
		]
	},

	resolve: {
		extensions: [ '', '.js', '.jsx' ]
	}
}
