const path = require('path');

const BUILD_DIR = path.resolve(`${__dirname}/../..`, 'src/server/dist');
const APP_DIR = path.resolve(`${__dirname}/../..`, 'src/api');

module.exports = {
  BUILD_DIR,
  APP_DIR
};
