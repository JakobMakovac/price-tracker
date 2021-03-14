var express = require('express');
var authentication = require('./authentication');
var tracker = require('./tracker');
var pricePoint = require('./pricepoint');

const app = express();

app.use('/authentication', authentication);
app.use('/tracker', tracker);
app.use('/pricepoints', pricePoint)

module.exports = app;