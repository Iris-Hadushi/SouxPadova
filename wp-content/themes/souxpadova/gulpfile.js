const {
    src,
    dest,
    watch,
    parallel
} = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cssimport = require("gulp-cssimport");
const babel = require('gulp-babel');
const browsersync = require("browser-sync").create();
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const ffmpeg = require('gulp-fluent-ffmpeg'); // for video
const plumber = require('gulp-plumber'); //for debug
const webpack = require('webpack-stream');
const newer = require('gulp-newer');
const tinypng = require('gulp-tinypng-compress');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');

// Insert here your development domain
var devsite = 'souxpadova.develop';

// BrowserSync
function browserSync(done) {
    browsersync.init({
        open: 'external',
        host: devsite,
        proxy: devsite, // or project.dev/app/
        // port: 80,
    });
    done();
}
// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// twig
function twig() {
    return src(['./templates/**/*.twig'])
    .pipe(browsersync.stream());
    // return gulp.src(config.twig.src)
    // .pipe(browserSync.reload({ stream: true }));
}

// styles
function style() {
    return src(['./assets/scss/*.scss'])
    .pipe(plumber({
        errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message: err.toString()
            })(err);
        }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed',}).on('error', sass.logError))
    .pipe(cssimport())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename("main.min.css"))
    .pipe(sourcemaps.write('./'))
    .pipe(dest("./dist/css"))
    .pipe(browsersync.stream())
    .pipe(notify('CSS Compiled'));
}

// Admin styles
function adminStyle() {
    return src(['./assets/scss/themes/admin.scss'])
    .pipe(plumber({
        errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message: err.toString()
            })(err);
        }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested',}).on('error', sass.logError))
    .pipe(cssimport())
    .pipe(sass({outputStyle: 'compressed',}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename("admin.min.css"))
    .pipe(sourcemaps.write('./'))
    .pipe(dest("./dist/css/"))
    .pipe(browsersync.stream())
    .pipe(notify('Admin CSS Compiled'));
}

//fonts
function fonts() {
    return src('./assets/fonts/*.{eot,svg,ttf,otf,woff,woff2}')
    .pipe(newer('./dist/fonts'))
    .pipe(dest('./dist/fonts'));
}

// images
function images() {
    return src('./assets/img/**/*.{png,jpg,jpeg}')
        .pipe(newer('./dist/img'))
        .pipe(tinypng({
            key: 'LoNi0JXMlZmcc7Tl8rVzmQenFAmkEjIH',
            sigFile: 'images/.tinypng-sigs',
            summarise: true,
            log: true
        }))
        .pipe(dest('./dist/img'))
}


//media
function media() {
    return src('./assets/video/*.{mp4,ogg,webp}')
    .pipe(newer('./dist/video'))
    .pipe(dest('./dist/video'))
    // .pipe(ffmpeg('mp4', function (cmd) {
    //     return cmd
    //     .audioCodec('libmp3lame')
    //     .videoCodec('libx264')
    //     .format('mp4')
    // }))
    // .pipe(gulp.dest('./dist/video'));
}

// icons
 function icons() {
     return src('./assets/img/icons/*.*')
         .pipe(newer('./dist/img/icons'))
         .pipe(dest('./dist/img/icons'))
 }

// svg
  function svg() {
      return src('./assets/img/vectors/*.*')
          .pipe(newer('./dist/img/vectors'))
          .pipe(dest('./dist/img/vectors'))
  }

// sprite
function sprite() {
    return src('./assets/img/vectors/*.svg')
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest: '.',
                    example: false,
                    sprite: 'sprite.svg'
                },
            }
        }))
        .pipe(dest('./dist/img/vectors'))
        .pipe(browsersync.stream());
}

// js
function js() {
    return src(['./assets/js/**.js'])
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(webpack({
            watch: false,
            mode: "production",
            entry: {
              main: './assets/js/main.js',
            },
            output: {
                filename: "[name].min.js",
            },
            optimization: {
                // chunkIds: false,
                splitChunks: {
                  chunks: 'all',
                  cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors~main"
                      },
                  },
                }
            },
            devtool: "source-map",
            performance: { hints: false },
            module: {
                rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    }
                }, ],
            },
            resolve: {
                modules: ['node_modules'],
            }
        }))
        .pipe(dest('./dist/js'))
        .pipe(browsersync.stream());
}

function adminScript() {
    return src(['./assets/js/themes/admin.js'])
        .pipe(newer('./dist/js/admin.js'))
        .pipe(dest('./dist/js'))
        .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    watch("./templates/**/*.twig", twig);
    watch("./assets/scss/**/*.scss", style);
    watch("./assets/scss/themes/admin.scss", adminStyle);
    watch("./assets/img/**/*.{png,jpg,jpeg}", images);
    watch("./assets/video/**/*.{gif,mp4,ogg,webp}", media);
    watch("./assets/img/vectors/*.svg", svg);
    watch("./assets/js/**/*.js", js);
    watch("./assets/js/themes/*.js", adminScript);
    src('./assets/js/**/*.js')
    .pipe(notify('Gulp is Watching, cheer! 🍺'));
}

exports.twig = twig;
exports.js = js;
exports.style = style;
exports.admin = parallel(adminStyle, adminScript);
exports.images = images;
exports.media = media;
exports.svg = svg;
exports.sprite = sprite;
exports.default = parallel(twig, style, fonts, images, icons, svg, media, js, adminStyle, adminScript, watchFiles, browserSync);
exports.build = parallel(twig, style, fonts, images, icons, svg, media, js, adminStyle, adminScript);
exports.watch = watchFiles;
