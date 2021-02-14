var express = require('express');
var authentication = require('./authentication');
var tracker = require('./tracker');

const app = express();

app.use('/authentication', authentication);
app.use('/tracker', tracker);

module.exports = app;