var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var es6ify = require('es6ify');

var paths = {
    styles: ['app.css'],
    scripts: ['app.js'],
    scriptsWatch: ['*.js', 'components/*.js']
};

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(minifyCss())
        .pipe(gulp.dest('dest'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(browserify({transform: es6ify, insertGlobals: true}))
        // .pipe(uglify())
        .pipe(gulp.dest('dest'));
});

gulp.task('default', ['styles', 'scripts']);

gulp.task('watch', ['default'], function() {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scriptsWatch, ['scripts']);
});
