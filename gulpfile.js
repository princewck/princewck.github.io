var gulp = require('gulp'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    pump = require('pump'),
    notify = require('gulp-notify');


gulp.task('default', ['csso', 'compressJs']);
gulp.task('csso', function () {
    return gulp.src('./profile/styles/*.css')
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./profile/dist/css'))
        .pipe(notify('css optimized!'));
});
gulp.task('compressJs', function(cb) {
    return gulp.src('./profile/scripts/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./profile/dist/js'));
});

gulp.task('watch', function() {
    gulp.watch(['./profile/scripts/*','./profile/styles/*'], ['default']);
});