// const gulp = require("gulp");

// function defaultTask(cb) {
//   console.log("Running defaulp task!");
//   cb();
// }
// exports.default = defaultTask;

// gulp.task("hello", function (done) {
//   console.log("Hello how are you doing!");
//   done();
// });

import gulp from "gulp";
import yargs from "yargs";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import gulpif from "gulp-if";

const sass = gulpSass(dartSass);

const PRODUCTION = yargs.argv.prod;

//default task for gulp
export default (done) => {
  done();
};

export const styles = () => {
  return gulp
    .src("src/assets/scss/bundle.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(PRODUCTION, cleanCSS({ compatibility: "ie8" })))
    .pipe(gulp.dest("dist/assets/css"));
};
