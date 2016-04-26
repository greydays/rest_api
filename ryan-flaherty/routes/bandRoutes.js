'use strict';

var Band = require('../models/band');
var auth = require('../lib/authenticate');
var bcrypt = require('bcrypt');

module.exports = (router) => {

  router.get('/bands', (req, res) => {
    console.log('/bands GET ALL route hit');
    Band.find({}, function(err, data) {
      if (err) {
        res.status(500).json({msg: 'Internal Server Error'});
      }
      res.json(data);
    });
  })

  .get('/bands/:band', (req, res) => {
    var bandId = req.body.band;
    console.log('/bands GET one route hit');
    Band.findOne({_id: bandId}, function(err, band) {
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'Internal server error'});
      }
      if (band) {
        res.json({
          name: band.name,
          email: band.email,
          genre: band.genre,
          shows: band.shows,
          _id: band._id
        });
      } else {
        res.status(404).json({msg: 'Unable to locate ' + bandId});
      }
    });
  })

  .get('/bands/profile', auth, (req, res) => {
    var bandName = req.body.bandName;
    console.log('/bands GET profile route hit');
    Band.findOne({name: bandName}, function(err, band) {
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'Internal server error'});
      }
      if (band) {
        res.json(band);
      } else {
        res.status(404).json({msg: 'Unable to locate ' + bandName});
      }
    });
  })

  .post('/bands', (req, res) => {
    console.log('/bands POST route hit');
    var band = new Band(req.body);
    band.save(function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
      res.json(data);
    });
  })

  .put('/bands/:band', auth, (req, res) => {
    console.log('/bands PUT route hit');
    var bandId = req.params.band;
    //if the password is being changed, hashes password
    if (req.body.password != null) {
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    }
    Band.update({_id: bandId}, req.body, function(err, band) {
      if (err) {
        return res.status(500).json({msg: err});
      }
      if (band) {
        res.json(band);
      } else {
        res.status(404).json({msg: 'Unable to locate ' + bandId });
      }
    });
  })

  .delete('/bands/:band', auth, (req, res) => {
    console.log('/bands DELETE route hit');
    var bandId = req.params.band;
    var bandName;
    Band.findOne({_id: bandId}, function(err, doc) {
      if (err){
        res.status(500).json(err);
      }
      bandName = doc.name;
      doc.remove();
      res.json({msg: bandName + ' was removed'});
    });
  })

  .post('/login', (req, res) => {
    let authorizationArray = req.headers.authorization.split(' ');
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    Band.findOne({email: name}, function(err, band) {
      let valid = band.compareHash(password);
      console.log('valid token: ' + valid);
      if (!valid) {
        return res.json({status: 'failure'});
      }
      res.json({token: band.generateToken(), name: band.name});
    });
  });

};
