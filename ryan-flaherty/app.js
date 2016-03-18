'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

var showRouter = require(__dirname + '/routes/showRoutes');
var bandRouter = require(__dirname + '/routes/bandRoutes');
var queryRouter = require(__dirname + '/routes/queryRoutes');
app.use('/shows', showRouter);
app.use('/bands', bandRouter);
app.use('/query', queryRouter);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/', function(req, res){
  res.render('index');
});

app.listen(port, function() {
  console.log('Server listening on port ' + (port || 3000));
});
