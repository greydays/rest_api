'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var request = chai.request;

process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require(__dirname + '/../app.js');
var Band = require('../models/band');

describe('band routes', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  var testParams = {
    name: 'testName',
    email: 'test@test.com',
    password: 'testpass',
    genre: 'testy'
  };
  it('should post a band', function(done)  {
    request('localhost:3000')
    .post('/bands')
    .send(testParams)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('testName');
      expect(res.body.email).to.eql('test@test.com');
      expect(res.body).to.have.property('_id');
      expect(res.body.password).to.not.eql('testpass');
      done();
    });
  });
    it('should login and return a token', function(done)  {
    request('localhost:3000')
    .post('/login')
    .auth('test@test.com', 'testpass')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('token');
      done();
    });
  });
});
