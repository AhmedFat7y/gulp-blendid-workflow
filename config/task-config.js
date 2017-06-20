let path = require('path');
let pug = require('gulp-pug');
let htmlSrcPath = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src);
let htmlDestPath = path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest);
let browserSync = require('browser-sync');

module.exports = {
  html: true,
  images: true,
  fonts: true,
  static: true,
  svgSprite: true,
  ghPages: true,
  stylesheets: true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./main.js"]
    }
  },

  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'public'
    }
  },
  html: {
    alternateTask: function (gulp, PATH_CONFIG, TASK_CONFIG) {
      // Jade task instead of Nunjucks
      return function () {
        gulp
          .src(`${path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src)}/pages/*.pug`)
          .pipe(pug())
          .pipe(gulp.dest(path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest)))
          .pipe(browserSync.stream())
      }
    }
  },
  production: {
    rev: true
  }
}

