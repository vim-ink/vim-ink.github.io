var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var es6ify = require('es6ify');

var paths = {
    styles: ['scss/app.scss'],
    scripts: ['js/app.js'],
    scriptsWatch: [
        '*.js',
        'js/app.js',
        'js/actions/*.js',
        'js/components/*.js',
        'js/constants/*.js'
    ]
};

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(sass())
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
