'use strict';

var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  var decoded;
  try {
    var token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.SECRET || 'change me');
    req.decodedToken = decoded;
    next();
  }
  catch (err) {
    return res.status(418).json({msg: 'stupid teapot'});
  }
  // lookup below conflicts with any route that also looks up Band
  /*var Band = require('../models/band');
  User.findOne({_id: decoded._id})
  .then(band => {
    req.band = band;
    next();
  })
  .catch(err => {
    console.log(err);
    res.status(418).json({msg: err});
  });*/
};
