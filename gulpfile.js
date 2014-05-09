var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var livereload = require('gulp-livereload')
var watchify = require('gulp-watchify')
var plumber = require('gulp-plumber')

var paths = {
  scripts: [
    'public/js/app.js',
  ],
  html: [
    'public/*.html'
  ],
  css: [
    'public/css/*.css'
  ]
}

gulp.task('browserify', watchify(function (watchify) {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(watchify({watch: true}))
    .pipe(gulp.dest('public/lib'))
    .pipe(livereload())
}))

gulp.task('process-html', function() {
  return gulp.src(paths.html)
    .pipe(livereload())
})

gulp.task('serve', function () {
  nodemon({ script: 'web.js'})
})

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['browserify']).on('change', notifyLivereloadServer(livereload()))
  gulp.watch(paths.css).on('change', notifyLivereloadServer(livereload()))
  gulp.watch(paths.html, ['process-html'])
})

gulp.task('default', ['browserify', 'serve', 'watch'])

function notifyLivereloadServer(server) {
  return function (file) {
    server.changed(file.path)
  }
}