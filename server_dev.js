const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

var webpack = require('webpack');
var config = require('./webpack.config');

const mailRoute = require('./api/routers/email');
const auth = require('./api/auth/router');

var app = express();
var compiler = webpack(config);

const mongoClient = require('./api/util/mongoClient');
mongoClient(app);

app.use(require('webpack-dev-middleware')(compiler, {noInfo: true, publicPath: config.output.publicPath}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { index: false, extensions: ['html'] }));

app.use(cors());

app.use('/api', mailRoute);
app.use('/auth', auth);


app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


const PORT = process.env.PORT || 8082;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on ${PORT}`);
  }
});