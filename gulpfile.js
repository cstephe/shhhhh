const gulp = require('gulp');
const wiredep = require('wiredep').stream;
const config = {
    clientSrc: './client/',
    depDir: this.clientSrc + 'bower_components'
};


gulp.task('default', require('gulp-task-listing'));
gulp.task('wire', function() {
    gulp.src(config.clientSrc + 'index.html')
    .pipe(wiredep())
    .pipe(gulp.dest(config.clientSrc));
})