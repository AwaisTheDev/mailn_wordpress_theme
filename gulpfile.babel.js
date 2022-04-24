import gulp from "gulp";
import yargs from "yargs";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";

const sass = gulpSass(dartSass);

const PRODUCTION = yargs.argv.prod;

//default task for gulp
export default (done) => {
  done();
};

const paths = {
  styles: {
    src: ["src/assets/scss/bundle.scss", "src/assets/scss/admin.scss"],
    dest: "dist/assets/css",
  },
};

// 1. Create source maps
// 2. SASS to  CSS conversion
// 3. Minification of CSS
export const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(PRODUCTION, cleanCSS({ compatibility: "ie8" })))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest));
};

// Automatically run styles task when a SCSS file is changed
export const watch = () => {
  gulp.watch("src/assets/scss/**/*.scss", styles);
};
