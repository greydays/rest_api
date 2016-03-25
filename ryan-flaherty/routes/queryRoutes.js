'use strict';

var Band = require('../models/band');
var Show = require('../models/show');

module.exports = (router) => {

  router.get('/genre/:genreQuery', (req, res) => {
    console.log('genre GET route hit');
    console.log(req.params);
    var findGenre = req.params.genreQuery;
    var results = {};
    results.count = 0;
    results.bands = [];
    Band.find({genre: findGenre}, function(err, data) {
      if (err) {
        res.status(500).json({msg: 'Internal Server Error'});
      }
      data.forEach(function(band) {
        results.count +=1;
        results.bands.push(band.name);
      });
      res.json(results);
    });
  });

};
