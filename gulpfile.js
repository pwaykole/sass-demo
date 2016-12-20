var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
browserSync = require('browser-sync').create();
gulp.task('css', function () {
    // this task is to compile sass
gulp.src(['./src/sass/main.scss'])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.cssmin())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch(['./src/sass/*.scss'], ['css']);
});

gulp.task('serve', function(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
});

gulp.watch('*.html').on('change', browserSync.reload);

gulp.task('default',['css','watch', 'serve']);