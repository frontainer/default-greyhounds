module.exports = {
  config: {
    dest: "public",
    sasssrc : "src/sass",
    imgsrc: "src/images/**/*",
    imgdir: "src/images",
    viewsrc: "src/view/*.pug"
  },
  task: {
    "clean": "rimraf ${dest}",
    "webpack": "webpack --config ./config/webpack.config.js",
    "imagemin": "imagemin ${imgsrc} --out-dir=${dest}/assets/images",
    "pug": "pug ${viewsrc} -o ${dest} -P",
    "htmlhint": "htmlhint ${dest}/**/*.html",
    "sprite": "spritesmith --rc ./config/sprite.config.js",
    "sasslint": "sass-lint ${sasssrc}/**/*.scss -v",
    "sass": "node-sass ${sasssrc} --output ${dest}/assets/css --source-map ${dest}/assets/css",
    "postcss": "postcss -c ./config/postcss.config.js -r ${dest}/assets/css/**/*.css -m",

    "build:html": "tasks pug && tasks htmlhint",
    "build:copy": "sync-dir --config ./config/sync.config.js",
    "build:script": "tasks webpack",
    "build:image": "tasks imagemin",
    "build:sass": "tasks sasslint && tasks sass && tasks postcss",

    "server": "browser-sync start --config ./config/server.config.js",

    "test": "karma start --single-run --no-auto-watch",
    "build": "tasks sprite && tasks build:*",
    "watch": "tasks watch:*",

    "watch:script": "tasks webpack -- -w",
    "watch:sass": "chokidar ${sasssrc}/**/*.scss -c 'tasks build:sass'",
    "watch:htmlhint": "chokidar ${dest}/**/*.html -c 'tasks htmlhint'",
    "watch:image": "chokidar ${imgdir}/**/* -c 'tasks build:image'",
    "watch:copy": "sync-dir -w --config ./config/sync.config.js",
    "watch:html": "tasks pug -- -w",
    "watch:test": "tasks test -- --no-single-run --auto-watch",
    "watch:server": "tasks server"
  }
};