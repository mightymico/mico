let path = require('path');


module.exports = {
  mdb: 'mongodb://d2khadka:d2khadka@ds223268.mlab.com:23268/mico_dev',
  // mdb: process.env.MDB || 'mongodb://localhost/b-a-b',
  // auth: {
  //   privateKey: '69bfadf4532dbccd9asc279d6affc8cd5861fdb7',
  //   expiresInMinutes: 20,
  //   algorithm: 'HS256',
  // },
  mqtt:'mqtt://iot.eclipse.org:1883',
  tokens: {secret: process.env.TOKEN_SECRET || '98d64bs7f1ab179e4f376b206c3w2270'},
  google: {
    client_id: '967919500698-d144mulltuieuin0dab1ur8ln2acq9kt.apps.googleusercontent.com',
    client_secret: 'lVp-TQFr9q9hF6QCenrD9VhD',
    redirect_uri: 'http://localhost:3000/google'
  }
};

