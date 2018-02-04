const async = require('async');

const User = require('./UserModel');
const jwtUtil = require('../util/jwtutil');

const decode = (req, cb) => {
  cb(null, jwtUtil.decodeJWT(req));
};

const getUser = (option, cb) => {
  User.findOne(option, {password: 0}, (err, r) => {
    if (err) return cb(err);
    if (r === null) return cb(new Error('user not found'));
    cb(null, r);
  });
}

const getMultipleUser = (option, cb) => {
  User.find(option, {password: 0}, (err, r) => {
    if (err) return cb(err);
    cb(null, r);
  });
}

const register = (info, cb) => {
  async.auto({
    findUserIfExists: (cb) => {
      User.findOne({email: info.email}, (err, data) => {
        if (err) {
          cb(err)
        } else {
          if (data) {
            cb('user_exists')
          } else {
            cb()
          }
        }
      })
    },
    createUser: ['findUserIfExists', (r, cb) => {
      const newUser = new User(info);
      newUser.save((err, d) => {
        cb(err, d);
      })
    }],
  }, cb)
}

const login = (info, cb) => {
  User.findOne({email: info.email}, (err, user) => {
    if (err) {
      console.log('isError', err);
      return cb(err);
    }
    if (user == null) return cb('Incorrect email or password. Please try again.');
    user.comparePassword(info.password, (err, isMatch) => {
      if (!isMatch) {
        return cb('Incorrect email or password. Please try again.');
      }
      cb(null, {token: jwtUtil.createJWT(user, 'login')});
    });
  });
};

const getPChgToken = (email, cb) => {
  User.findOne({email: email}, (err, user) => {
    if (err) {
      console.log('isError', err);
      return cb(err);
    }
    if (user == null) return cb('not Found');
    cb(null, jwtUtil.createJWT(user, 'changePassword'));
  })
};

const changePassword = (payload, password, cb) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      console.log('isError', err);
      return cb(err);
    }
    if (user == null) return cb('not Found');
    user.password = password;
    user.save((err, r) => {
      if (err) {
        console.log('isError', err);
        return cb(err);
      }
      cb(null, {success: true});
    })
  });
}

const updateUser = (_id, info, cb) => {
  User.findOneAndUpdate({_id}, info, {new: true}, cb);
}

module.exports = {register, login, changePassword, decode, getPChgToken, getUser, getMultipleUser, updateUser}