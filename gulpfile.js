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

gulp.task('watchify', watchify(function (watchify) {
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

gulp.task('watch', function () {
  gulp.watch(paths.css).on('change', notifyLivereloadServer)

  gulp.watch(paths.html, ['process-html'])
})


gulp.task('test', function () {
  runTests(paths.tests)
})

gulp.task('watch-test', function () {
  gulp.watch(paths.tests).on('change', runTestForChangedFile)
  gulp.watch(paths.scripts, ['test'])
})

gulp.task('default', ['test', 'watchify', 'serve', 'watch'])

function notifyLivereloadServer(file) {
  livereload().changed(file.path)
}

function runTestForChangedFile(file) {
  runTests([file.path])
}

function runTests(tests) {
  gulp.src(tests)
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
}