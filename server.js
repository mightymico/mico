const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const routes = require('./routes')
const logger = require('./system').logger;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { index: false, extensions: ['html'] }));

app.use(cors());
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

routes(app);

const PORT = process.env.PORT || 8082;
app.listen(PORT, (err) => {
  if (err) {
    logger.info(err);
  } else {
    logger.info(`Listening on ${PORT}`);
  }
});