const path = require('path');

const BUILD_DIR = path.resolve(`${__dirname}/../..`, 'src/client/dist');
const APP_DIR = path.resolve(`${__dirname}/../..`, 'src/client/app');

module.exports = {
  BUILD_DIR,
  APP_DIR
};
