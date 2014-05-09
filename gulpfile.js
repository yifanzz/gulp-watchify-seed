var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var livereload = require('gulp-livereload')
var watchify = require('gulp-watchify')
var plumber = require('gulp-plumber')
var mocha = require('gulp-mocha')

var paths = {
  scripts: [
    'public/js/app.js',
  ],
  html: [
    'public/*.html'
  ],
  css: [
    'public/css/*.css'
  ],
  tests: [
    'test/**/*.js'
  ]
}

gulp.task('browserify', watchify(function (watchify) {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(watchify({watch: true}))
    .pipe(gulp.dest('public/lib'))
    .pipe(livereload())
}))

gulp.task('process-html', function() {
  gulp.src(paths.html)
    .pipe(livereload())
})

gulp.task('serve', function () {
  nodemon({ script: 'web.js'})
})

gulp.task('test', function () {
  gulp.src(paths.tests)
    .pipe(mocha({reporter: 'spec'}))
})

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['browserify'])
    .on('change', notifyLivereloadServer)

  gulp.watch(paths.css)
    .on('change', notifyLivereloadServer)
    
  gulp.watch(paths.html, ['process-html'])
})

gulp.task('watch-test', function () {
  gulp.watch(paths.tests, ['test'])
})

gulp.task('default', ['test', 'browserify', 'serve', 'watch'])

function notifyLivereloadServer() {
  return function (file) {
    livereload().changed(file.path)
  }
}