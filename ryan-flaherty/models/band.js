'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var bandSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  genre: String,
  shows: [{type: Schema.Types.ObjectId, ref: 'Shows'}]
});

bandSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

bandSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

bandSchema.methods.generateToken = function() {
  return jwt.sign({ _id: this._id}, process.env.SECRET ||'change me');
};

module.exports = mongoose.model('Band', bandSchema);
