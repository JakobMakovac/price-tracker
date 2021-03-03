var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrackerModel = mongoose.model(
    'TrackerModel',
    new Schema({
        name: String,
        url: String,
        watcherId: String,
    })
);

module.exports = {
    TrackerModel
};