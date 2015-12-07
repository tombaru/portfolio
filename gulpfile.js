var gulp = require("gulp"),
  connect = require("gulp-connect"),
  opn = require("opn"),
  clean = require('gulp-rimraf'),
  ftp = require('vinyl-ftp'),
  gutil = require('gulp-util'),
  useref = require('gulp-useref'),
  minifyCSS = require('gulp-minify-css'),
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


// Pathes for BUILD
var path = {
  build: {
    html: './dist/',
    css: './dist/css/',
    img: './dist/img/',
    js: './dist/js/'
  },
  src: {
    html: ['./app/*.html'],
    css: './app/css/*.css',
    img: './app/img/*.*',
    js: './app/js/*.*'
  },
  clean: './dist'
};


// ===========================================
// ================= BUILD ==================
// ===========================================

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('html:build', function () {
  var assets = useref.assets();
  return gulp.src(path.src.html)
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css:build', function () {
  gulp.src(path.src.css)
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.build.css));
});


gulp.task('img:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js));
});


gulp.task('dist', ['html:build','js:build', 'css:build', 'img:build']);

gulp.task('build', ['clean'], function () {
  gulp.start('dist');
});


// ===========================================
// ================= DEPLOY ==================
// ===========================================

gulp.task( 'deploy', function() {

  var conn = ftp.create( {
      host: 'sulfur.locum.ru',
      user: 'hosting_tombaru',
      password: 'hXTwYNIPSY4',
      parallel: 10,
      log: gutil.log
  } );

  var globs = [
      'dist/**/*'
  ];

  return gulp.src(globs, { base: 'dist/', buffer: false })
    .pipe(conn.dest('/projects/rawraw/htdocs/'));
});


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
