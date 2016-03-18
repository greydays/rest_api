var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
  date: Date,
  venue: String,
  bands: String,
  // regBands: {type: Schema.Types.ObjectId, ref: 'Bands'},
  cost: Number
});

module.exports = mongoose.model('Show', showSchema);

// {
//     "date": "Sat Mar 26 2016 00:00:20 GMT-0700 (PDT)",
//     "venue": "Neumos",
//     "bands": "Tacocat, Your Mom, That Guy, Murder Trout",
//     "regBands": "56ec38f61be261b37d058265"
//     "cost": "10"
// }
