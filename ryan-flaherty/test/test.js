'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var request = chai.request;


process.env.MONGOLAB_URI = 'mongodb://localhost/';
require(__dirname + '/../app.js');
var Band = require('../models/band');

describe('test routes', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should post a band', function(done)  {
    request('localhost:3000')
    .post('/band/')
    .send({'name': 'Testers', 'genre': 'test'})
    .end(function(err, res) {
      // expect(err).to.eql(null);
      expect(res.body.name).to.eql('Testers');
      expect(res.body).to.have.property('_id');
      done();
    });
  });



});
