'use strict';

// INCLUDE PLUGINS
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    del = require('del'),
    env = require('gulp-environment'),
    htmlBeautify = require('gulp-html-beautify'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    nunjucksRender = require('gulp-nunjucks-render'),
    rename = require('gulp-rename'),
    pump = require('pump'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    server = require('gulp-server-livereload'),
    uglify = require('gulp-uglify');

// CONSTANTS
    // MAIN FOLDER PATHS
    var DEVELOPMENT_DIR = './development/';
	var PUBLIC_DIR = './public/';
	var ASSETS_DIR = PUBLIC_DIR+'assets/';
    var NUNJUCKS_DIR = DEVELOPMENT_DIR+'./nunjucks/';

	// ASSET PATHS
	var PATHS = {
        src: DEVELOPMENT_DIR+'src/',
        srcSass: DEVELOPMENT_DIR+'src/sass/',
        srcJs: DEVELOPMENT_DIR+'src/js/',
        img: DEVELOPMENT_DIR+'img/',
        fonts: DEVELOPMENT_DIR+'fonts/',
        data: DEVELOPMENT_DIR+'data/',
        dist: ASSETS_DIR+'dist/',
        distCss: ASSETS_DIR+'dist/css/',
        distJs: ASSETS_DIR+'dist/js/',
        distImg: ASSETS_DIR+'dist/img/',
        distData: ASSETS_DIR+'data/',
        vendorJs: DEVELOPMENT_DIR+'vendor/js/',
        vendorCss: DEVELOPMENT_DIR+'vendor/css/'
	};

    // BROWSERS TO TARGET WHEN PREFIXING CSS.
    var AUTOPREFIXER_OPTIONS = {
        browsers: ['last 2 versions', 'ie >= 9', 'safari >= 8']
    };

    // HTML PATHS
    var HTML_BEAUTIFY_OPTIONS = {
        'indentSize': 4,
        'indent_with_tabs': false,
        'end_with_newline': true,
        'max_preserve_newlines': 1
    };

    var UGLIFY_OPTIONS = {
        compress: {
            drop_console: true
        },
        mangle: false,
        preserveComments: false,
        report: "min"
    };

    // PUMP CALLBACK
    var pumpCb = function (err) {
        if (err) {
            console.log('Error: ', err.toString());
        }
    };

    // IF DEVELOPMENT ENVIRONMENT
    if (env.is.development()) {
        console.log('development');
        var NUNJUCKS_ENV = 'development';
    }

    // IF PRODUCTION ENVIRONMENT
    if (env.is.production()) {
        console.log('production');
        var NUNJUCKS_ENV = 'production';
    }

// OPTIMISATION TASKS
    // NUNJUCKS
    var manageNunjucksEnv = function(environment) {
        environment.addGlobal('NUNJUCKS_ENV', NUNJUCKS_ENV);
    }

    // BUILD HTML FILES
    gulp.task('nunjucks', function () {
        pump([
            gulp.src(NUNJUCKS_DIR+'pages/**/*.+(html|nunjucks)'),
            nunjucksRender({
                path: NUNJUCKS_DIR+'templates',
                manageEnv: manageNunjucksEnv
            }),
            htmlBeautify(HTML_BEAUTIFY_OPTIONS),
            gulp.dest(PUBLIC_DIR),
            env.if.development(notify({ message: 'Finished: Nunjucks', onLast: true }))
        ],
            pumpCb
        );
    });

    // TASKS FOR JS FILES
    gulp.task('custom-js', function () {
        pump([
            gulp.src(PATHS.srcJs+'**/*.js'),
            env.if.production(uglify(UGLIFY_OPTIONS)),
            env.if.production(rename({ suffix: '.min' })),
            gulp.dest(PATHS.distJs),
            env.if.development(notify({ message: 'Finished: Local JS', onLast: true }))
        ],
            pumpCb
        );
    });

    //COPY AND CONCAT VENDOR JS FILES
    gulp.task('vendor-js', function () {
        pump([
            gulp.src(PATHS.vendorJs+'**/*.js'),
            env.if.production(concat('vendor.js')),
            env.if.production(uglify(UGLIFY_OPTIONS)),
            env.if.production(rename({ suffix: '.min' })),
            gulp.dest(PATHS.distJs)
        ],
            pumpCb
        )
    });

    // COPY & COMPILE CSS FROM LOCAL SASS FILES
    gulp.task('sass', function () {
        pump([
            gulp.src(PATHS.srcSass+'**/*.scss'),
            env.if.development(sass()),
            env.if.production(sass({ outputStyle:'compact' })),
            autoprefixer(AUTOPREFIXER_OPTIONS),
            env.if.production(rename({ suffix: '.min' })),
            gulp.dest(PATHS.distCss),
            env.if.development(notify({ message: 'Finished: Local SASS', onLast: true }))
        ],
            pumpCb
        )
    });

    //COPY AND CONCAT VENDOR CSS FILES
    gulp.task('vendor-css', function () {
        pump([
            gulp.src(PATHS.vendorCss+'**/*.css'),
            env.if.production(concat('vendor.min.css')),
            gulp.dest(PATHS.distCss)
        ],
            pumpCb
        )
    });

    // COOY DATA FILES
    gulp.task('data', function () {
        pump([
            gulp.src(PATHS.data+'**/*'),
            gulp.dest(PATHS.distData)
        ],
            pumpCb
        );
    });

    // COMPRESS IMAGES
    gulp.task('images', function () {
        pump([
            gulp.src(PATHS.img+'**/*'),
            cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })),
            gulp.dest(PATHS.distImg)
        ],
            pumpCb
        );
    });

    // CLEAN DIST FOLDER
    gulp.task('clean:dist', function() {
        return del.sync([PATHS.distCss, PATHS.distJs]);
    });

    // BUILD SEQUENCES
    gulp.task('build', function(callback) {
        runSequence('clean:dist',
            ['nunjucks', 'custom-js', 'vendor-js', 'sass', 'vendor-css', 'images', 'data'],
            callback
        );
    });

    // START SERVER
    gulp.task('server', function () {
        pump([
            gulp.src(PUBLIC_DIR),
            server({
                livereload: true,
                open: true
            })
        ],
            pumpCb
        );
    });

    // CALLS
    gulp.task('default', ['build', 'server'], function () {
        gulp.watch(PATHS.srcSass+'**/*.scss',['sass']);
        gulp.watch(PATHS.srcJs+'**/*.js',['custom-js']);
        gulp.watch(PATHS.data+'**/*.json',['data']);
        gulp.watch([NUNJUCKS_DIR+'pages/**/*.+(html|nunjucks)',NUNJUCKS_DIR+'templates/**/*.+(html|nunjucks)'],['nunjucks']);
    });
