var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = {};

db.mongoose = mongoose;

db.user = require('../models/user');

module.exports = db;