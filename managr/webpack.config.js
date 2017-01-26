//require our dependencies
var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    //the base directory (absolute path) for resolving the entry option
    context: __dirname,
    //the entry point we created earlier. Note that './' means
    //your current directory. You don't have to specify the extension  now,
    //because you will specify extensions later in the `resolve` section
    entry: './assets/js/index',

    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('./assets/bundles/'),
        //naming convention webpack should use for your files
        filename: '[name]-[hash].js',
    },

    plugins: [
        //tells webpack where to store data about your bundles.
        new BundleTracker({filename: './webpack-stats.json'}),
        //makes jQuery available in every module
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],

    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['react'] } },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'}
          ]
    },

    resolve: {
        //tells webpack where to look for modules
        modulesDirectories: ['node_modules'],
        //extensions that should be used to resolve modules
        extensions: ['', '.js', '.jsx']
    }
}
