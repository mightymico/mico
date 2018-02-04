// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
let userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
  website: String,
  companyName:String,
  email: {type: String, unique: true},
  role: {type: String, enum: ['user', 'admin', 'agent', 'owner'], default: 'user'}
});

userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });


});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  // console.log('candidatePassword',candidatePassword);
  // console.log('this.password',this.password);
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('users', userSchema);// export default mongoose.model('User', userSchema);
