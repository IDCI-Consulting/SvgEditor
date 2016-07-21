'use strict';

var scripts = 'src/**/*.js',
    views   = 'index.html'
;

var gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    babel      = require('gulp-babel')
;

// Task to watch files
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(scripts, ['babel', 'views']);
  // gulp.watch(views, ['views']);
});

gulp.task('babel', function() {
  gulp
    .src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('lib'))
  ;
});

gulp.task('views', function() {
    gulp
      .src(views)
      .pipe(livereload())
    ;
});
