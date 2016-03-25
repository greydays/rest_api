'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/data');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

var router = express.Router();
require(__dirname + '/routes/showRoutes')(router);
require(__dirname + '/routes/bandRoutes')(router);
require(__dirname + '/routes/queryRoutes')(router);
app.use('/', router);

app.listen(port, function() {
  console.log('Server listening on port ' + (port || 3000));
});

