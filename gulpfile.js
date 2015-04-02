'use strict';

// gulp plugins
var gulp = require('gulp');
var changed = require('gulp-changed');
var gutil = require('gulp-util');
var connect = require( 'gulp-connect' );

// misc
var spawn = require('child_process').spawn;
var argv = require('minimist')(process.argv.slice(2));

// webpack
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var ngminPlugin = require('ngmin-webpack-plugin');

if (argv.production) {
  webpackConfig.plugins = webpackConfig.plugins.concat(
    new ngminPlugin(),
    new webpack.optimize.UglifyJsPlugin());
  webpackConfig.devtool = false;
  webpackConfig.debug = false;
}

var ports = {
  livereload: 35729
};

var paths = {
  other: [
    'src/**',
    '!src/**/*.js',
    '!src/**/*.coffee',
    '!src/**/*.scss'
  ],
  buildDir: './build/'
};

gulp.task('webpack', function(cb) {
  return webpack(webpackConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
      colors: true
    }));
    return cb();
  });
});

gulp.task('other', function() {
  return gulp.src(paths.other)
    .pipe(changed(paths.buildDir))
    .pipe(gulp.dest(paths.buildDir));
});

gulp.task('connect', function() {
  connect.server( {
    root : paths.buildDir
  });
});

var rimraf = require('rimraf');

gulp.task('clearTarget', function() {
  return rimraf.sync(paths.buildDir, gutil.log);
});

gulp.task('build', ['clearTarget', 'webpack', 'other']);

gulp.task( 'serve', [ 'connect', 'watch' ] );

gulp.task('watch', ['clearTarget', 'other'], function() {
  var flo, fs, path;
  fs = require('fs');
  path = require('path');
  flo = require('fb-flo');
  flo(paths.buildDir, {
    port: 8888,
    host: 'localhost',
    verbose: false,
    glob: ['**/*.js', '**/*.css', '**/*.html']
  }, function(filepath, callback) {
    var reload, url;
    url = filepath;
    reload = true;
    if ((path.extname(filepath)) === '.html') {
      url = '/';
    }
    return callback({
      resourceURL: url,
      contents: fs.readFileSync(paths.buildDir + filepath),
      reload: reload
    });
  })
  webpack(webpackConfig).watch(200, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    return gutil.log('[webpack]', stats.toString({
      colors: true
    }));
  });
  return gulp.watch(paths.other, ['other']);
});

gulp.task('default', ['build']);
