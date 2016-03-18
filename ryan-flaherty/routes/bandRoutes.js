'use strict';

var Band = require('../models/band');
var express = require('express');
var bandRouter = express.Router();

bandRouter.get('/', (req, res) => {
  console.log('/bands GET ALL route hit');
  Band.find({}, function(err, data) {
    if (err) {
      res.status(500).json({msg: 'Internal Server Error'})
    }
    res.json(data);
  });
});

bandRouter.get('/:band', (req, res) => {
  var bandId = req.params.band;
  console.log('/bands GET one route hit');
  Band.findOne({_id: bandId}, function(err, band) {
    if (err) {
      console.log(err);
      res.status(500).json({msg: 'Internal server error'});
    }
    if (band) {
      res.json(band);
    } else {
      res.status(404).json({msg: 'Unable to locate ' + bandId});
    }
  });
});

bandRouter.post('/', (req, res) => {
  console.log('/bands POST route hit');
  var band = new Band(req.body);
  band.save(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.json(data);
  });
});

bandRouter.put('/:band', (req, res) => {
  console.log('/bands PUT route hit');
  var bandID = req.params.band
  var newBandInfo = req.body;
  Band.update({_id: bandID}, newBandInfo, function(err, band) {
    if (err) {
      return res.status(500).json({msg: err});
    }
    if (band) {
      res.json(band);
    } else {
      res.status(404).json({msg: 'Unable to locate ' + band.name});
    }
  });
});

bandRouter.delete('/:band', (req, res) => {
  console.log('/bands DELETE route hit');
  var bandId = req.params.band;
  Band.findOne({_id: bandId}, function(err, doc) {
    if (err){
      res.status(500).json(err)
    }
    doc.remove();
    res.json({msg: 'Band was removed'});
  });
});
module.exports = bandRouter;

