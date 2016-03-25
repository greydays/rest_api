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

  .get('/bands/:band', auth, (req, res) => {
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
  })

  .post('/bands/', (req, res) => {
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
    Band.findOne({_id: bandId}, function(err, doc) {
      if (err){
        res.status(500).json(err);
      }
      doc.remove();
      res.json({msg: 'Band was removed'});
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
      res.json({token: band.generateToken()});
    });
  });

};
