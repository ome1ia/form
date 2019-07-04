//npm i --save-dev gulp gulp-watch gulp-cache gulp-sass gulp-clean gulp-clean-css event-stream gulp-autoprefixer gulp-concat gulp-uglify gulp-rename

'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css'),
    stream = require('event-stream'),
    prefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');


var path = {
    build: { 
        js:     'js/',
        css:    'css/',
        fonts:  'fonts/'
    },
    dev: {
        js:     'dev/js/*.js',
        css:    'dev/scss/*.scss',
        fonts:  'dev/fonts/**/*.*'
    },
    watch: { 
        js:     'dev/js/*.js',
        css:    'dev/scss/*.scss',
        fonts:  'dev/fonts/**/*.*'
    },
    clean: ['js/*', 'css/*', 'fonts/**/*.*']
};

//js
gulp.task('js:build', gulp.series(function () {
    return gulp.src(path.dev.js) 
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.build.js));
}));

//css
gulp.task('style:build', gulp.series(function () {
    return gulp.src(path.dev.css) 
        .pipe(sass())
        .pipe(cleanCSS({compatibility: '*', level: {1: {specialComments: 0}}}))
        .pipe(gulp.dest(path.build.css))
}));

//fonts
gulp.task('fonts:build', gulp.series(function() {
    return gulp.src(path.dev.fonts)
        .pipe(gulp.dest(path.build.fonts));
}));

//clean
gulp.task('clean', function() {
  return gulp.src(path.clean, {read: false})
    .pipe(clean());
});

//build
gulp.task('build', gulp.parallel(
    'clean',
    'js:build',
    'style:build',
    'fonts:build',
));

//watch
gulp.task('watch', gulp.parallel(function(){
    watch('dev/scss/**/*.scss', function(event, cb) {
        gulp.task('style:build')();
//        cb();
    });
    watch('dev/js/*.js', function(event, cb) {
        gulp.task('js:build')();
//        cb();
    });
    watch('dev/fonts/**/*.*', function(event, cb) {
        gulp.task('fonts:build')();
//        cb();
    });
}));

//start
gulp.task('default', gulp.series('build', 'watch'));
