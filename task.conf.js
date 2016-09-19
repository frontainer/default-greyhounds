module.exports = {
  config: {
    tmp: '.tmp',
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
    "sass": "node-sass ${sasssrc} --output ${tmp}/css --source-map ${tmp}/css",
    "postcss": "postcss -m -c ./config/postcss.config.js -d ${dest}/assets/css ${tmp}/css/**/*.css",

    "build:html": "tasks pug && tasks htmlhint",
    "build:copy": "sync-dir --config ./config/sync.config.js",
    "build:script": "tasks webpack",
    "build:image": "tasks imagemin",
    "build:sass": "tasks sasslint && tasks sass && tasks postcss && rimraf ${tmp}",

    "server": "browser-sync start --config ./config/server.config.js",

    "test": "karma start --single-run --no-auto-watch",
    "build": "tasks sprite && tasks build:*",
    "watch": "tasks watch:*",
    "production": "tasks production:*",

    "watch:script": "tasks webpack -- -w",
    "watch:sass": "chokidar ${sasssrc}/**/*.scss -c 'tasks build:sass'",
    "watch:htmlhint": "chokidar ${dest}/**/*.html -c 'tasks htmlhint'",
    "watch:image": "chokidar ${imgdir}/**/* -c 'tasks build:image'",
    "watch:copy": "sync-dir -w --config ./config/sync.config.js",
    "watch:html": "tasks pug -- -w",
    "watch:test": "karma start --no-single-run --auto-watch",
    "watch:server": "tasks server",

    "production:html": "tasks pug && tasks htmlhint",
    "production:copy": "sync-dir --config ./config/sync.config.js",
    "production:script": "webpack --config ./config/webpack.config.production.js",
    "production:image": "tasks imagemin",
    "production:sass": "tasks sasslint && tasks sass && tasks postcss",
  }
};