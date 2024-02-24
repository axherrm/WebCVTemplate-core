const gulp = require("gulp");
const inline = require("gulp-inline");
const replace = require('gulp-replace');

const fs = require('fs')
const path = require('path');

const backgroundJson = require('../input/data/settings/background.json');
const basePath = './dist/cv/browser/';
const backgroundImgPath = `${basePath}${backgroundJson.backgroundImageFolder}${backgroundJson.defaultWidth}${backgroundJson.fileExtension}`;
const pdfPath = `${basePath}assets/CV-static.pdf`;

/**
 * Inline background image by search for the exact string "inlineBackgroundImg()"
 */
function inlineBackgroundImg() {
  return replace(/inlineBackgroundImg\(\)/, (full, capture) => {
    const base64 = fs.readFileSync(backgroundImgPath, 'base64');
    return `data:image/png;base64,${base64}`;
  });
}

/**
 * Inline static CV PDF by search for the exact string "inlinePDF()"
 */
function inlinePDF() {
  return replace(/inlinePDF\(\)/, (full, capture) => {
    const base64 = fs.readFileSync(pdfPath, 'base64');
    return `data:application/pdf;base64,${base64}`;
  });
}

/**
 * Inline all fonts that are stored in /media folder and have a compatible file extension
 * @returns {NodeJS.ReadWriteStream}
 */
function inlineMedia() {
  return replace(/url\("(\.\/media\/.*?)"\)/g, (full, filePath) => {
    if (filePath.includes("?")) {
      return full;
    }
    const fileExt = path.extname(filePath).toLowerCase();
    let mimeType;
    switch (fileExt) {
      case ".woff":
        mimeType = "font/woff";
        break;
      case ".woff2":
        mimeType = "font/woff2";
        break;
      case ".ttf":
        mimeType = "font/truetype";
        break;
      case ".eot":
        mimeType = "application/vnd.ms-fontobject";
        break;
      case ".otf":
        mimeType = "font/otf"
        break;
      default:
        return full;
    }
    const base64 = fs.readFileSync(basePath + filePath, 'base64');
    return `url(data:${mimeType};base64,${base64})`;
  });
}

/**
 * Inline all png and svg assets
 */
function inlineAssets() {
  return replace(/"(assets|.\/assets)(.*?)"/g, (full, assets, filePath) => {
    const fileExt = path.extname(filePath).toLowerCase();
    if (fileExt === "") {
      console.log("removed", fileExt, full)
      return full;
    }
    const base64 = fs.readFileSync(`${basePath}assets${filePath}`, 'base64');
    let mimeType;
    switch (fileExt) {
      case ".png":
        mimeType = "image/png";
        break;
      case ".svg":
        mimeType = "image/svg+xml";
        break;
      default:
        return full;
    }
    return `"data:${mimeType};base64,${base64}"`;
  });
}

gulp.task("default", () => {
  return gulp
    .src("./dist/cv/browser/index.html")
    .pipe(inline())                 // inline main js & main css to html
    .pipe(inlineBackgroundImg())    // inline background image
    .pipe(inlinePDF())              // inline static CV PDF
    .pipe(inlineMedia())            // inline fonts of /media folder
    .pipe(inlineAssets())           // inline svg/png assets
    .pipe(gulp.dest("./single-dist"));
});

/**
 * Possible improvements:
 *  - angular.json optimisation styles.inlineCritical seems to brake some things, e.g. font of the heading, and thus is deactivated for now
 *  - some fonts are not inlined but still loaded from the internet
 */
