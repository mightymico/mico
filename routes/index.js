const appConfig = require('../config').app;
const amazonRoute = require('../api/amazon');
const googleRoute = require('../api/google');

const production = process.env.NODE_ENV === 'production';

module.exports = app => {
  app.use('/services/google', googleRoute);
  app.use('/services/amazon', amazonRoute);

  if (production) {
    app.get('/*', (request, response) => {
      response.sendFile(`${appConfig.publicPath}/index.html`);
    });
  }
  else {
    app.get('/*', (request, response) => {
      response.sendFile(`${appConfig.devPath}/index.html`);
    });
  }
};
