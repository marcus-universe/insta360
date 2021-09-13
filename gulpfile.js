// Import important packages
const gulp = require('gulp');
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');

// SASS -> CSS
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const stripCssComments = require('gulp-strip-css-comments');

// HTML
const htmlmin = require('gulp-htmlmin');

// JavaScript / TypeScript
const terser = require('gulp-terser-js');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('uglifyify');
const JSHINT = require('jshint');
const { createGulpEsbuild } = require('gulp-esbuild');
const gulpEsbuild = createGulpEsbuild({ incremental: true });

// Define important variables
const src = './dev';
const dest = './insta360_one_x2';
const useTypeScript = false;

// Reload the browser
const reload = (done) => {
    browserSync.reload();
    done();
};

// Serve the dev-server in the browser
const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: `${dest}`
        }
    });
    done();
};

const html = () => {
    return gulp.src(`${src}/*.html`)
        .pipe(gulp.dest(`${dest}`));
};

const php = () => {
    return gulp.src(`${src}/*.php`)
        .pipe(gulp.dest(`${dest}`));
};

const thumbnail = () => {
    return gulp.src(`${src}/*.jpg`)
        .pipe(gulp.dest(`${dest}`));
};

const txt = () => {
    return gulp.src(`${src}/*.txt`)
        .pipe(gulp.dest(`${dest}`));
};

const style_css = () => {
    // Find SASS
    return gulp.src(`${src}/sass/style.sass`)
        // Init Plumber
        .pipe(plumber())
        // Start sourcemap
        .pipe(sourcemaps.init())
        // Compile SASS to CSS
        .pipe(sass.sync({ outputStyle: "nested" })).on('error', sass.logError)
        // Add suffix
        .pipe(rename({ basename: 'style', suffix: ".min" }))
        // Add Autoprefixer & cssNano
        .pipe(postcss([autoprefixer()]))
        // Write sourcemap
        .pipe(sourcemaps.write(''))
        .pipe(stripCssComments())
        // Write everything to destination folder
        .pipe(gulp.dest(`${dest}/css`))
        // Reload page
        .pipe(browserSync.stream());
};


const jsFrameworks = () => {
    return gulp.src(`${src}/js/frameworks/*.js`)
        .pipe(gulp.dest(`${dest}/js/frameworks`));
};

const typescript = () => {
    return gulp.src(`${src}/js/script.ts`);
};

const javascript = () => {
    return gulp.src(`${src}/js/script.js`);
};

const script = () => {
    const sourceStream = useTypeScript ? typescript() : javascript();

    return sourceStream
        .pipe(gulpEsbuild({
            outfile: 'script.js',
            bundle: false,
            minify: false,
            sourcemap: true,
            platform: 'browser'
        }))
        .pipe(buffer())
        .pipe(gulp.dest(`${dest}/js`));
};

// Copy assets
const img = () => {
    return gulp.src(`${src}/img/**`)
        .pipe(gulp.dest(`${dest}/img`));
};


// Watch changes and refresh page
const watch = () => gulp.watch(
    [`${src}/*.html`, `${src}/js/**/*.js`, `${src}/sass/**/*.sass`, `${src}/css/**/*.*`],
    gulp.series(style_css, html, php, txt, jsFrameworks, script, img, thumbnail, reload));

// Development tasks
const dev = gulp.series(style_css, html, php, txt, jsFrameworks, script, img, thumbnail, serve, watch);

// Build tasks
const build = gulp.series(style_css);

// Default function (used when type "gulp")
exports.default = dev;
exports.dev = dev;
exports.build = build;