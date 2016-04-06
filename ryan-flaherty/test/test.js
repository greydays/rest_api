'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var request = chai.request;
var port = 'localhost:3000';
var token;
var bandId;
var showId;

process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require(__dirname + '/../app.js');

var bandParams = {
  name: 'testBand',
  email: 'testBand@test.com',
  password: 'testpass',
  genre: 'testy'
};
var showParams = {
  date: '12/12/2020',
  venue: 'testHouse',
  cost: 10
};

describe('band routes', function() {
  before((done) => {
    request(port)
    .post('/bands')
    .send(bandParams)
    .end(function(err, res) {
      bandId = res.body._id;
      console.log('bandID: ' + bandId);
      done();
    });
  });
  before((done) => {
    request(port)
    .post('/login')
    .auth('testBand@test.com', 'testpass')
    .end(function(err, res) {
      token = res.body.token;
      console.log('token: ' + token);
      done();
    });
  });
  before((done) => {
    request(port)
    .post('/shows')
    .set('Authorization', 'Token ' + token)
    .send(showParams)
    .end((err, res) => {
      showId = res.body._id;
      console.log('showID: ' + showId);
      done();
    });
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should POST a show', (done) => {
    request(port)
    .post('/shows')
    .set('Authorization', 'Token ' + token)
    .send(showParams)
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.venue).to.eql('testHouse');
      done();
    });
  });
  it('should GET all shows', (done) => {
    request(port)
    .get('/shows')
    .set('Authorization', 'Token ' + token)
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.be.an('array');
      expect(res.body[0].venue).to.eql('testHouse');
      done();
    });
  });
  it('should GET at show', (done) => {
    request(port)
    .get('/shows/' + showId)
    .end(function (err, res) {
      console.log('This is showId ' + showId);
      expect(err).to.eql(null);
      console.log(res.text);
      expect(res.body.venue).to.eql('testHouse');
      done();
    });
  });
  it('should PUT a show venue name', (done) => {
    console.log(showId);
    request(port)
    .put('/shows/' + showId)
    .set('Authorization', 'Token ' + token)
    .send({venue: 'newVenue'})
    .end(function (err, res) {
      expect(err).to.eql(null);
      console.log(res.text);
      expect(res.text).to.eql('{"ok":1,"nModified":1,"n":1}');
      done();
    });
  });
  it('should DELETE a show', (done) => {
    request(port)
    .delete('/shows/' + showId)
    .set('Authorization', 'Token ' + token)
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.equal('{"msg":"Show at newVenue on 12/12/2020 was removed"}');
      done();
    });
  });
  it('should PUT a band genre', (done) => {
    request(port)
    .put('/bands/' + bandId)
    .set('Authorization', 'Token ' + token)
    .send({genre: 'spacePants'})
    .end(function (err, res) {
      expect(err).to.eql(null);
      console.log(res.text);
      expect(res.text).to.eql('{"ok":1,"nModified":1,"n":1}');
      done();
    });
  });
  it('should GET a band', (done) => {
    request(port)
    .get('/bands/' + bandId)
    .set('Authorization', 'Token ' + token)
    .end(function (err, res) {
      expect(err).to.eql(null);
      console.log('this is bandId get ' + bandId);
      expect(res.body.genre).to.eql('spacePants');
      done();
    });
  });
  it('should DELETE a band', (done) => {
    request(port)
    .delete('/bands/' + bandId)
    .set('Authorization', 'Token ' + token)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.equal('{"msg":"' + bandParams.name + ' was removed"}');
      done();
    });
  });

});
