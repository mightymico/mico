var config =require('./../config');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports.createJWT = function (user, type) {
  var payload = {
    sub: user._id,
    role:user.role,
    type: type,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  var token = jwt.encode(payload, config.tokens.secret);
  return token;
};

module.exports.decodeJWT = function (token){
  return jwt.decode(token, config.tokens.secret);
}