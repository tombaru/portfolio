var gulp = require("gulp"),
	connect = require("gulp-connect"),
	opn = require("opn"),
    jade = require('gulp-jade'),
    prettify = require('gulp-prettify'),
    sass = require('gulp-sass');

// Запуск сервера c лайврелоадом
gulp.task('serv_livereload', function() {
	connect.server({
		root: 'app',
		livereload: true,
		port: 8888
	});
	opn('http://localhost:8888');
});


// Компилируем Jade в html
gulp.task('jade', function() {
  gulp.src('app/jade/pages/*.jade')
    .pipe(jade())
    .on('error', log)
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('app/'))
    .pipe(connect.reload());
});

// Компилируем sass в css 
gulp.task('sass', function () {
  gulp.src('app/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

// Работа с html
gulp.task('html', function () {
	gulp.src('./app/*.html')
	.pipe(connect.reload());
});

// Работа с css
gulp.task('css', function () {
	gulp.src('./app/css/*.css')
	.pipe(connect.reload());
});

// Работа с js
gulp.task('js', function () {
	gulp.src('./app/js/*.js')
	.pipe(connect.reload());
});

// Слежка
gulp.task('watch', function () {
	gulp.watch(['./app/*.html'], ['html']);
	gulp.watch(['./app/css/*.css'], ['css']);
	gulp.watch(['./app/js/*.js'], ['js']);
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
});


gulp.task('default', ['serv_livereload', 'watch']);

// ===================== Функции ======================

// Более наглядный вывод ошибок
var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}


// ====================================================