'use strict';

var scripts = 'src/**/*.js',
    views   = 'index.html'
;

var gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    babel      = require('gulp-babel'),
    optimize   = require('gulp-requirejs-optimize'),
    chown      = require('gulp-chown'),
    chmod      = require('gulp-chmod')
;

// Task to watch files
gulp.task('watch', ['babel'], function() {
  livereload.listen();
  gulp.watch(scripts, ['babel', 'views']);
  // gulp.watch(views, ['views']);
});

// Task to watch files
gulp.task('prod', ['babel'], function() {});

gulp.task('babel', function() {
  gulp
    .src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(chown('www-data'))
    .pipe(chmod(750))
    .pipe(gulp.dest('lib'))
  ;
});

// reload page after editing index.html
gulp.task('views', function() {
    gulp
      .src(views)
      .pipe(livereload())
    ;
});

// task to build the project (one file output)
gulp.task('build', ['babel'], function () {
    gulp
      .src('lib/init.js')
      .pipe(optimize({
        out:"svg-editor.min.js",
        optimize: 'uglify2',
        include: [
          "init.js",
          "plugins/AutoSave/AutoSavePlugin",
          "plugins/ColorPicker/ColorPickerPlugin",
          "plugins/ImageLoader/ImageLoaderPlugin",
          "plugins/OutputArea/OutputAreaPlugin",
          "plugins/KeyboardListener/KeyboardListenerPlugin",
          "plugins/ImageDragAndDropper/ImageDragAndDropperPlugin",
          "plugins/ManualSave/ManualSavePlugin"
        ],
      }))
      .pipe(chown('www-data'))
      .pipe(chmod(750))
      .pipe(gulp.dest('dist'))
    ;
});

