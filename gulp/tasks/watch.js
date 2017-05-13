var gulp        = require('gulp'),
watch           = require('gulp-watch'),
browserSync     = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({
        notify: false,  // Supresses notification on updates
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function() {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function() {
        gulp.start('scriptsRefresh');
    });

});

// Middle argument is 'dependencies': tasks which must be run
//  before the function is called.
gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
});