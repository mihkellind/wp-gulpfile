var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var watch       = require('gulp-watch');

// BROWSER SYNC TASK
gulp.task('browser-sync', function() {
    //watch files
    var files = [
        './style.css', // watch this css file
        './components/**/*.php' // watch these php files
    ];


    //initialize browsersync
    browserSync.init(files, {


         notify: true 
        , open: true 
        , port: 3000 // Port number for the live version of the site; default: 3000
        , proxy: 'localhost/YOUR-PROJECT-NAME' // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work
        , watchOptions: {
            debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads
        }
    });
});

// SASS TASK
gulp.task('sass', function () {
    return gulp.src('./assets/stylesheets/style.scss') // Do the SASS thing for this file
        .pipe(sass())
        .pipe(gulp.dest('./')) // Output for CSS file
        .pipe(reload({stream:true}));
});

// DEFAULT TASK
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("assets/stylesheets/**/*.scss", ['sass']);
});