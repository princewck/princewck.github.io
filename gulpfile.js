var gulp = require('gulp'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    pump = require('pump'),
    notify = require('gulp-notify');


gulp.task('default', ['csso', 'compressJs']);
gulp.task('csso', function () {
    return gulp.src('./profile/styles/*.css')
        .pipe(csso())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./profile/dist/css'))
        .pipe(notify('css optimized!'));
});
gulp.task('compressJs', function() {
    pump([
        gulp.src('./profile/scripts/*.js')
            .pipe(concat('app.min.js')),
        uglify(),
        gulp.dest('./profile/dist/js/')
            .pipe(notify('js compressed!'))
    ]);
});

gulp.task('watch', function() {
    gulp.watch(['./profile/scripts/*','./profile/styles/*'], ['default']);
});