var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PricePointsSchema = new Schema({
    timestamp: Date,
    price: Number
});

var TrackerModel = mongoose.model(
    'TrackerModel',
    new Schema({
        name: String,
        url: String,
        watcherIds: [String],
        pricepoints: [{type: Schema.Types.ObjectId, ref:'PricePointsSchema'}]
    })
);

var PricePointsModel = mongoose.model('PricePointsModel', PricePointsSchema);

module.exports = {
    TrackerModel,
    PricePointsModel
};