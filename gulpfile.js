/* File: gulpfile.js */

// grab our packages
var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    pug     = require('gulp-pug'),
    minify  = require('gulp-minifier'),
    concat  = require('gulp-concat');


// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/js/mapp/templates/**/*.pug', ['compile-pug']);
  gulp.watch('source/js/controllers/*.js', ['jshint','compileControllers']);
  gulp.watch('source/js/**/*.js', ['compile-angular','build-js']);
  gulp.watch('source/css/**/*.css', ['minify-css','build-css']);
});

// // configure the jshint task
// gulp.task('jshint', function() {
//   return gulp.src('source/js/controllers/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'));
// });

//minify css
gulp.task('minify-css', function() {
  return gulp.src('source/css/**/*.css').pipe(minify({
    collapseWhitespace: true,
    minifyCSS: true,
  })).pipe(gulp.dest('assets/css/'));
});

//minify css
gulp.task('copyFonts', function() {
  return gulp.src('source/fonts/**/*').pipe(gulp.dest('assets/fonts/'));
});

//-- PUG Build --//
gulp.task('compile-pug', function buildHTML() {
  return gulp.src('source/js/mapp/templates/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('assets/js/mapp/templates/'))
});

gulp.task('compile-angular', function(){
  return gulp.src([
    'source/js/lib/angular.min.js',
    'source/js/lib/angular-modal-service.min.js',
    'source/js/lib/scroll.js',
    'source/js/lib/angular-route.js',
    'source/js/lib/angular-classy.js',
    'source/js/lib/angular-animate.min.js',
    'source/js/lib/angular-touch.js',
    'source/js/mapp/mapp.js',
    'source/js/mapp/controllers/**/*.js'])
    .pipe(concat('mapp.js'))
    .pipe(gulp.dest('./assets/js/mapp'))
});

gulp.task('build-css', function() {
  return gulp.src('source/css/**/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('build-js', function(){
  return gulp.src([
    'source/js/lib/jquery.min.js',
    'source/js/lib/popper.min.js',
    'source/js/lib/bootstrap.min.js',
    'source/js/lib/jquery.easing.min.js',
    'source/js/lib/Chart.min.js',
    'source/js/lib/jquery.dataTables.js',
    'source/js/lib/dataTables.bootstrap4.js',
    'source/js/lib/sb-admin.js'])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./assets/js/lib'));
});


