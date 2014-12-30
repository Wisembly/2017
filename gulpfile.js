var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var cssmin        = require('gulp-cssmin');


// BrowserSync parameters
gulp.task('browser-sync', function() {
    browserSync.init(["src/scss/**/*.scss", "*.html"], {
        notify: false,
        server: {
            baseDir: "./"
        },
        reloadDelay: 500
    });
});


// Dev mode: Sass + Autoprefixer
gulp.task('dev', function(){
	return gulp.src('src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true
        }))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('dist/css'))
        .pipe(reload({
            stream: true
            }));
});

// Prod mode: Sass + Autoprefixer + Minifier
gulp.task('prod', function(){
	return gulp.src('src/scss/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(cssmin({
        		keepSpecialComments: '0'
        	}))
        	.pipe(rename('style.min.css'))
		.pipe(gulp.dest('dist/css'));
});

// Default task = `dev` + LiveReload
gulp.task('default', ['dev', 'browser-sync'], function() {
    gulp.watch(["src/scss/**/*.scss", "*.html"], ['dev']);
});
