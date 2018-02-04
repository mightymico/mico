const path = require('path');

const rootPath = path.normalize(`${__dirname}/..`);
const publicPath = `${rootPath}/src/client/dist`;
const devPath = `${rootPath}/src/client/app`;

module.exports = {
  rootPath,
  publicPath,
  devPath
};
