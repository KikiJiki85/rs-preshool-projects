import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import plumber from 'gulp-plumber';
import browser from 'browser-sync';

export const styles = () => {
    return gulp.src('sass/style.scss', { sourcemaps: true})
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('css', {sourcemaps: '.'}))
    .pipe(browser.stream());
}

const server = (done) => {
    browser.init({
        server: {
            baseDir: './'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

const watcher = () => {
    gulp.watch('sass/**/*.scss', gulp.series(styles));
    gulp.watch('*.html').on('change', browser.reload);
};

export default gulp.series(
    styles, server, watcher
);