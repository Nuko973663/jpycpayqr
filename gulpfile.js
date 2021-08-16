var gulp = require("gulp");
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

//パス設定
var paths = {
  jsSrc: "./src",
  jsDist: "./src",
};

//JS圧縮

gulp.task("default", function () {
  return gulp.watch(["src/jpycpayqr.min.js"], function () {
    return gulp
      .src([
        "src/lib/web3.min.js",
        "src/lib/qrcode.min.js",
        "src/jpycpayqr.min.js",
      ])
      .pipe(concat("js.min.js"))
      .pipe(gulp.dest(paths.jsDist));
  });
});

gulp.task("xwin", function () {
  return gulp.watch(["src/xwinpayqr.min.js"], function () {
    return gulp
      .src(["src/qrcode.min.js", "src/xwinpayqr.min.js"])
      .pipe(concat("xwinpayqr.min.js"))
      .pipe(gulp.dest(paths.jsDist));
  });
});
