'use strict';

var Show = require('../models/show');
var express = require('express');
var showRouter = express.Router();

showRouter.get('/', (req, res) => {
  console.log('/shows GET ALL route hit');
  Show.find({}, function(err, data) {
    if (err) {
      res.status(500).json({msg: 'Internal Server Error'})
    }
    res.json(data);
  });
});

showRouter.get('/:show', (req, res) => {
  var showId = req.params.show;
  console.log('/shows GET one route hit');
  Show.findOne({_id: showId}, function(err, show) {
    if (err) {
      console.log(err);
      res.status(500).json({msg: 'Internal server error'});
    }
    if (show) {
      res.json(show);
    } else {
      res.status(404).json({msg: 'Unable to locate ' + showId});
    }
  });
});

showRouter.post('/', (req, res) => {
  console.log('/shows POST route hit');
  var show = new Show(req.body);
  show.save(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.json(data);
  });
});

showRouter.put('/:show', (req, res) => {
  console.log('/shows PUT route hit');
  var showID = req.params.show
  var newShowInfo = req.body;
  Show.update({_id: showID}, newShowInfo, function(err, show) {
    if (err) {
      return res.status(500).json({msg: err});
    }
    if (show) {
      res.json(show);
    } else {
      res.status(404).json({msg: 'Unable to locate ' + show.name});
    }
  });
});

showRouter.delete('/:show', (req, res) => {
  console.log('/shows DELETE route hit');
  var showId = req.params.show;
  Show.findOne({_id: showId}, function(err, doc) {
    if (err){
      res.status(500).json(err)
    }
    doc.remove();
    res.json({msg: 'Show was removed'});
  });
});
module.exports = showRouter;

