'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
//var sourcemap = require('gulp-sourcemaps');
var server = require('browser-sync').create();
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('jsToDemo', function() {
  return gulp.src('source/js/*.js')
    .pipe(gulp.dest('demo/js'));
});

gulp.task('jsToDist', function() {
  return gulp.src('source/js/aa-modal.js')
	.pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('aa-modal.min.js'))
	.pipe(gulp.dest('dist'));
});

gulp.task('server', function () {
  server.init({
    server: 'demo/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/js/*.js', gulp.series('jsToDemo', 'jsToDist', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/ajax/*.html', gulp.series('ajax', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('demo'));
});

gulp.task('ajax', function () {
  return gulp.src('source/ajax/*.html')
	.pipe(gulp.dest('demo/ajax'));
});


gulp.task('cleanDemo', function() {
  return del('demo');
});

gulp.task('cleanDist', function() {
  return del('dist');
});

gulp.task('build', gulp.series(
	'cleanDemo',
	'cleanDist',
	'jsToDemo',
	'jsToDist',
	'html',
	'ajax',
));

gulp.task('start', gulp.series('build', 'server'));
