var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = {};

db.mongoose = mongoose;

db.user = require('../models/user');
db.tracker = require('../models/tracker').TrackerModel;
db.pricePoint = require('../models/pricepoints').PricePointsModel;

module.exports = db;