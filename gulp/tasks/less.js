var gulp = require('gulp');
var less = require('gulp-less');

var handleErrors = require('../util/handleErrors');
var config = require('../config').less;

gulp.task('less', function() {
  gulp.src(config.src)
    .pipe(less())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
});