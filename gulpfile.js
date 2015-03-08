var gulp = require('gulp');
var babel = require('gulp-babel');
var find = require('find');

function jsSrc() {
  return find.fileSync(/\.js$/, 'src');
}

gulp.task('babel', function () {
  return jsSrc().map(function (src) {
    gulp.src(src)
      .pipe(babel())
      .pipe(gulp.dest(
        'build/' + src.split('/').slice(1, -1).join('/')
      )
    )
  });
});
gulp.task('watch', function () {
  gulp.watch(jsSrc(), ['babel']);
});

gulp.task('default', ['babel', 'watch']);