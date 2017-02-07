var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var clean = require('gulp-clean-css');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('sass', function() {
	return gulp.src(['./scss/main.scss'])
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('concat-css', ['sass'], function(){
    	return gulp.src([
				'lib/jquery-ui/jquery-ui.css',
				'lib/datatables/DataTables-1.10.12/css/jquery.dataTables.min.css',
				'lib/datatables/datatables.min.css',
				'lib/fullcalendar/fullcalendar.css',
				'lib/select2/dist/css/select2.css',
				'dist/css/layout.css',
				'dist/css/main.css',
				'dist/css/login-style.css',
				'lib/bootstrap/css/bootstrap-theme.css',
				'lib/bootstrap/css/bootstrap.min.css'
			])
    	.pipe(concat('all.css'))
    	.pipe(gulp.dest('./dist/css'));
});

gulp.task('sassito',function() {
    gulp.watch('scss/**/*.scss',['concat-css']);
});

gulp.task('clean',['concat-css'], function(){
	return gulp.src('dist/css/all.css')
	.pipe(clean({compatibility: 'ie8'}))
	.pipe(rename({
		dirname: "css",
		basename: "all",
		suffix: ".min",
		extname: ".css"
	}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('concat-js', ['clean'], function(){
    	return gulp.src([
				'./lib/jquery/jquery-3.1.1.min.js',
				'./lib/jquery-ui/jquery-ui.js',
				'./lib/datatables/datatables.min.js',
				'./lib/fullcalendar/lib/moment.min.js',
				'./lib/fullcalendar/fullcalendar.js',
				'./lib/select2/dist/js/select2.js',
				'./lib/bootstrap/js/bootstrap.min.js'
			])
    	.pipe(concat('all.js'))
    	.pipe(gulp.dest('./dist/js'));
});
