const gulp = require("gulp");
const inline = require("gulp-inline");
const base64Inline = require("gulp-base64-inline");

// function inlineImgs(opts) {
//   console.log("inlineImgs")
//   console.log(opts)
//   return
// }

gulp.task("default", () => {
  return gulp
    .src("./dist/cv/browser/index.html")
    .pipe(inline())
    .pipe(base64Inline())
    .pipe(gulp.dest("./single-dist"));
});



