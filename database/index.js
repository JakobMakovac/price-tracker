var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = {};

db.mongoose = mongoose;

db.user = require('../models/user');
db.tracker = require('../models/tracker').TrackerModel;
db.pricePoint = require('../models/tracker').PricePointsModel;

module.exports = db;