var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemap = require('gulp-sourcemaps'),
    autoprefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    twig = require('gulp-twig'),
    htmlbeautify = require('gulp-html-beautify'),
    concat = require('gulp-concat');

var pathes = {
    src: "./src",
    public: {
        dev: "./public-dev",
        prod: "./public-prod"
    },
    html: {
        src: "/html/*.html",
        watch: ["./src/html/*.html","./src/blocks/**/*.html"]
    },
    css: {
        src: "/less/style.less",
        dest: "/css/",
        watch: ["./src/less/*.less","./src/blocks/**/*.less"]
    },
    js: {
        src: "/js/*.js",
        dest: "/js/",
        watch: ["./src/js/*.js","./src/blocks/**/*.js"]
    },
    media: {
        image: {
            src: "/media/imgs/**/*.*",
            dest: "/media/imgs/"
        },
        font: {
            src: ["!./src/fonts/**.css","./src/fonts/**/*.*"],
            dest: "/media/fonts/"
        }
    }
};

var blocksJSPathes = [pathes.src+pathes.js.src,pathes.src+'/blocks/**/*.js'];

var serverDevOptions = {
    server: {
        baseDir: pathes.public.dev+"/",
        routes: {
            "/src": pathes.src+"/",
            "/": pathes.public.dev+"/index.html"
        }
    },
    port: 8080,
    open: false,
    notify: false,
    ui: {
        port: 8010
    },
    ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
    }
};

gulp.task('dev', ['html-dev', 'css-dev', 'js-dev', 'img-dev', 'font-dev']);

gulp.task('watch', function () {
    browserSync.init(serverDevOptions);
    gulp.watch(pathes.html.watch,['html-dev']);
    gulp.watch(pathes.css.watch,['css-dev']);
    gulp.watch(pathes.js.watch,['js-dev']);
});

gulp.task('html-dev',function () {
    return gulp.src(pathes.src+pathes.html.src)
        .pipe(twig())
        .pipe(htmlbeautify({
            max_preserve_newlines: 0
        }))
        .pipe(gulp.dest(pathes.public.dev))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('css-dev',function () {
    return gulp.src(pathes.src+pathes.css.src)
        .pipe(sourcemap.init())
        .pipe(less())
        .pipe(autoprefix({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(pathes.public.dev+pathes.css.dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js-dev', ['jquery-dev'],function () {
    return gulp.src(blocksJSPathes)
        .pipe(concat('script.js'))
        .pipe(gulp.dest(pathes.public.dev+pathes.js.dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('img-dev',function () {
    return gulp.src(pathes.src+pathes.media.image.src)
        .pipe(gulp.dest(pathes.public.dev+pathes.media.image.dest));
});

gulp.task('font-dev', function () {
    return gulp.src(pathes.media.font.src)
        .pipe(gulp.dest(pathes.public.dev+pathes.media.font.dest));
});

gulp.task('jquery-dev', function () {
    return gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(pathes.public.dev+pathes.js.dest));
});