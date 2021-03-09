var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrackerModel = mongoose.model(
    'TrackerModel',
    new Schema({
        name: String,
        url: String,
        alertPrice: Number,
        lowestPrice: Number,
        currentPrice: Number,
        highestPrice: Number,
        watcherId: String,
    })
);

module.exports = {
    TrackerModel
};