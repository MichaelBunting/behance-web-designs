var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    path = require('path');

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
                .pipe(sass({
                    outputStyle: 'compressed'
                }))
                .on('error', notify.onError({
                    title: "Error compiling SCSS",
                }))
                // .pipe(notify({
                //     title: "Compiled File",
                //     message: "Compiled: <%= file.relative %>",
                //     icon: path.join(__dirname, 'node_modules/gulp-notify/assets', 'gulp.png'),
                // }))
                .pipe(rename(function(path) {
                    path.basename += '.min';
                }))
                .pipe(gulp.dest('www/css/'));
});

gulp.task('watch', ['sass'], function() {
    gulp.watch('src/scss/**/*.scss', {cwd: './'}, ['sass']);
});
