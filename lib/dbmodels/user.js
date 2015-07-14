// User Accoount MongoDB Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  createDate: { type: Date, default: Date.now },
  name: String,
  email: String,
  username: String,
  password: String,
  resetPassToken: String,
  resetPassExpire: Date,
  confirmed: { type: Boolean, default: false },
  optIn: { type: Boolean, default: false },
  preaccount: { type: Boolean, default: false },
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  servers: [String]
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

// Export the schemas
module.exports = mongoose.model('users', userSchema);
