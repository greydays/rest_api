'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');
var clean = require('gulp-clean');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var minifyCss = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  js: ['*.js', 'app/**/*.js'],
  html: 'app/**/*.html',
  css: ['app/**/*.scss', 'app/**/*.sass'],
  e2eTest: 'clientTest/*_spec.js'
};

gulp.task('lint', function(){
  return gulp.src(paths.js)
    .pipe(lint())
    .pipe(lint.format());
});

gulp.task('build:css', function() {
  gulp.src('app/sass/index.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/'));
});

gulp.task('build:html', function() {
  gulp.src(paths.html)
  .pipe(gulp.dest('public/'));
});

gulp.task('build:js', function() {
  return gulp.src('app/js/client.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('public/'));
});

gulp.task('clean', function() {
  return gulp.src('build', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('bundle:test', () => {
  return gulp.src(paths.e2eTest)
    .pipe(webpack({output: {filename: 'test_bundle.js'}}))
    .pipe(gulp.dest('./clientTest'));
});

gulp.task('watch:css', function() {
  gulp.watch(paths.css, ['build:css']);
});

gulp.task('watch:html', function() {
  gulp.watch(paths.html, ['build:html']);
});

gulp.task('watch:js', function() {
  gulp.watch(paths.js, ['build:js']);
});

gulp.task('build:all', ['build:css', 'build:html', 'build:js']);
gulp.task('watch:all', ['watch:css', 'watch:html', 'watch:js']);
gulp.task('default', ['build:all', 'watch:all']);
