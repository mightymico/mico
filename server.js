const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const routes = require('./routes')
const logger = require('./system').logger;

const app = express();

const auth = require('./api/auth/router');

const mongoClient = require('./api/util/mongoClient');
mongoClient(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { index: false, extensions: ['html'] }));

app.use(cors());

// all routes here
routes(app);

app.use('/auth', auth);
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, (err) => {
  if (err) {
    logger.info(err);
  } else {
    logger.info(`Listening on ${PORT}`);
  }
});