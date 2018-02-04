const appConfig = require('../../../config').app;
const amazonRoute = require('../../../src/api/amazon');
const googleRoute = require('../../../src/api/google');
const mailRoute = require('../../../src/api/routers/email');
const authRoute = require('../../../src/api/auth/router');
const testRoute = require('../../../src/api/routers/test');

const production = process.env.NODE_ENV === 'production';

module.exports = app => {
  app.use('/services/google', googleRoute);
  app.use('/services/amazon', amazonRoute);
  app.use('/test', testRoute);
  app.use('/api', mailRoute);
  app.use('/auth', authRoute);

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
