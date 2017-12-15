const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

//Compile sass
gulp.task('sass', function () {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});

// Move JS files to src
gulp.task('js', function () {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
                   'node_modules/jquery/dist/jquery.min.js',
                   'node_modules/popper.js/dist/popper.min.js'])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream());
});

// Watch SASS and Serve
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './src',
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch(['src/*.html']).on('change', browserSync.reload);
});

//Move Font Awesome to src folder
gulp.task('fonts', function () {
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest('src/fonts'));
});

// MOve font awesome css files
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("src/css"));
});

gulp.task('default',['js','serve','fa','fonts']);
