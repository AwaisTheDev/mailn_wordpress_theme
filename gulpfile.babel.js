import gulp from "gulp";
import yargs from "yargs";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
import imagemin from "gulp-imagemin";
import del from "del";

const sass = gulpSass(dartSass);

const PRODUCTION = yargs.argv.prod;

//default task for gulp
// export default (done) => {
//   console.log("Default");
//   done();
// };

const paths = {
  styles: {
    src: ["src/assets/scss/bundle.scss", "src/assets/scss/admin.scss"],
    dest: "dist/assets/css",
  },
  images: {
    src: "src/assets/images/**/*.{png,jpg,jpeg,svg,gif}",
    dest: "dist/assets/images",
  },
  other: {
    src: [
      "src/assets/**/*",
      "!src/assets/{images,scss,js}",
      "!src/assets/{images,scss,js}/**/*",
    ],
    dest: "dist/assets",
  },
};

export const clean = (done) => {
  del(["dist"]);
  done();
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

export const images = () => {
  return gulp
    .src(paths.images.src)
    .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(gulp.dest(paths.images.dest));
};

export const copy = () => {
  return gulp.src(paths.other.src).pipe(gulp.dest(paths.other.dest));
};

// Automatically run styles task when a SCSS file is changed
export const watch = () => {
  gulp.watch("src/assets/scss/**/*.scss", styles);
  gulp.watch(paths.other.src, copy);
  gulp.watch(paths.images.src, images);
};

export const dev = gulp.series(
  clean,
  gulp.parallel(styles, images, copy),
  watch
);
export const build = gulp.series(clean, gulp.parallel(styles, images, copy));

export default dev;
