const historyApiFallback = require('connect-history-api-fallback');
module.exports = {
  "files": [
    'public/**/*'
  ],
  "watchOptions": {
    "ignoreInitial": true,
    "ignored": '**/*.map'
  },
  "reloadDelay": 300,
  "server": 'public',
  "port": 3000,
  "middleware": [
    // historyApiFallback()
  ],
  "ghostMode": {
    "clicks": true,
    "scroll": true,
    "forms": {
      "submit": true,
      "inputs": true,
      "toggles": true
    }
  }
};