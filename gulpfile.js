'use strict';

var gulp       = require('gulp'),
    babel      = require('gulp-babel'),
    optimize   = require('gulp-requirejs-optimize'),
    chown      = require('gulp-chown'),
    chmod      = require('gulp-chmod'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify')
;

// Task to watch files
gulp.task('watch', ['babel'], function() {
  gulp.watch('src/**/*.js', ['babel']);
});

// Task to watch files

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

// task to build the project (one file output)
gulp.task('build', ['babel'], function () {
    gulp
      .src('lib/init.js')
      .pipe(optimize({
        out:"svg-editor.min.js",
        optimize: 'uglify2',
        include: [
          "init.js",
          "utils.js",
          "plugins/ImageFlipper/ImageFlipperPlugin",
          "plugins/ImageLoader/ImageLoaderPlugin",
          "plugins/ManualSave/ManualSavePlugin",
          "plugins/AutoSave/AutoSavePlugin",
          "plugins/ObjectResizer/ObjectResizerPlugin",
          "plugins/ColorPicker/ColorPickerPlugin",
          "plugins/OutputArea/OutputAreaPlugin",
          "plugins/KeyboardListener/KeyboardListenerPlugin",
          "plugins/ImageDragAndDrop/ImageDragAndDropPlugin",
          "plugins/AutoImageResizer/AutoImageResizerPlugin",
          "plugins/RemoveObject/RemoveObjectPlugin"
        ]
      }))
      .pipe(chown('www-data'))
      .pipe(chmod(750))
      .pipe(gulp.dest('dist'))
    ;
});