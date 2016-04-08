'use strict';

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'))
.listen(8080, () => console.log('client server started on port 8080'));
