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
  var Band = require('../models/Band');
  Band.findOne({_id: decoded._id})
  .then(band => {
    req.band = band;
    next();
  })
  .catch(err => {
    console.log(err);
    res.status(418).json({msg: err});
  });
};
