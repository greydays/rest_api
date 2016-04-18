'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  venue: String,
  bands: String,
  regBands: [{type: Schema.Types.ObjectId, ref: 'Bands'}],
  cost: Number
});

module.exports = mongoose.model('Show', showSchema);


