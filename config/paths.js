const path = require('path');

const ROOT = path.join(__dirname, '..');
const PATHS = {
  SRC:    ROOT + '/src',
  PUBLIC: ROOT + '/public',
  BUILD:  ROOT + '/public/build'
};

module.exports = PATHS;
