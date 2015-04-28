'use strict';

var webpack            = require( 'webpack' );
var path               = require( 'path' );
var BowerWebpackPlugin = require( 'bower-webpack-plugin' );

var PATHS = {
    app : __dirname + '/app',
    bower : __dirname + '/app/bower_components'
};

module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.js$/,
                loader: 'ng-annotate!babel!jshint',
                exclude: /node_modules|bower_components/
            },
             {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=res/[name].[ext]?[hash]'
            },
            {
                test: /\.html/,
                loader: 'raw'
            },
            {
                test: /\.json/,
                loader: 'json'
            }
        ]
      },
    resolve: {
        root: __dirname + '/app'
    },
    context : PATHS.app,
    entry : {
        app:[ 'webpack/hot/dev-server',  './core/bootstrap.js' ]
    },
    output : {
        path: PATHS.app,
        filename : 'bundle.js'

    },
    plugins: [
      new BowerWebpackPlugin({
        modulesDirectories: [ 'app/bower_components' ],
        manifestFiles:      'bower.json',
        searchResolveModulesDirectories: true
      })
    ]
};
