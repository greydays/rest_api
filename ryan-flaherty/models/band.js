var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bandSchema = new Schema({
  name: String,
  genre: String
  // shows: {type: Schema.Types.ObjectId, ref: 'Shows'}
});

module.exports = mongoose.model('Band', bandSchema);
