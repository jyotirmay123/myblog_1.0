var gulp = require('gulp');
var del = require('del');

gulp.task('clean:output', function () {
  return del([
    './myblogUI/app/js/*'
  ]);
});

gulp.task('default', ['clean:output']);