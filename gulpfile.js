var browserSync   = require('browser-sync').create();
var gulp          = require('gulp');
var pug           = require('gulp-pug');
var sass          = require('gulp-sass');
var base64        = require('gulp-base64');
var prefix        = require('gulp-autoprefixer');
var rename        = require('gulp-rename');

var onError = function(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    ui: false,
    ghostMode: false,
    server: "dist"
  });

  gulp.watch("dist/**/*.html").on("change", browserSync.reload)
});

gulp.task('pug', function () {
  return gulp.src('src/pug/**/*.pug')
    .pipe(pug({ pretty: "  " }))
    .on('error', onError)
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss')
		.pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(base64({
        extensions: ['svg'],
        maxImageSize: false
      }))
    .pipe(prefix({
      browsers: ['Safari 7', 'last 2 versions']
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('build', ['pug', 'sass']);

gulp.task('default', ['pug', 'sass', 'browser-sync'], function () {
  gulp.watch('**/*.scss', ['sass']);
  gulp.watch('**/*.pug', ['pug']);
});
