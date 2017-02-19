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
			{ test: /\.jsx$/, include: path.join(__dirname, 'managr_react'), loaders: ['react-hot', 'babel'] },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
			{ test: /\.svg/, loader: 'svg-url-loader', options: {}}
		]
	},

	resolve: {
		extensions: [ '', '.js', '.jsx' ]
	}
}
