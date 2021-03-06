var gulp       = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
    connect = require('gulp-connect-php'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){ 
	return gulp.src('app/sass/**/*.scss') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css')) 
		.pipe(browserSync.reload({stream: true})) 
});

gulp.task('browser-sync', function() { 
    browserSync({
        baseDir: 'app',
        proxy: 'cye.loc'
      });
});

gulp.task('scripts', function() {
	return gulp.src([ 
		'js/common.js'
		])
		.pipe(concat('common.js')) 
		.pipe(uglify()) 
		.pipe(gulp.dest('app/js')); 
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.scss')
		.pipe(sass()) 
		.pipe(cssnano()) 
		.pipe(rename({suffix: '.min'})) 
		.pipe(gulp.dest('app/css')); 
});

gulp.task('clean', function() {
	return del.sync('dist'); 
});


gulp.task('build', ['clean', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([ 
		'app/css/main.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') 
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') 
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') 
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']); 
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/*.php', browserSync.reload);
	gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], browserSync.reload);  
});

gulp.task('default', ['watch']);