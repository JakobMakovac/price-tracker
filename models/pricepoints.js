var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PricePointsSchema = new Schema({
    url: String,
    pricepoints: [{type: Schema.Types.ObjectId, ref:'PricePointSchema'}]
});

var PricePointSchema = new Schema({
    timestamp: Date,
    price: Number
})

var PricePointsModel = mongoose.model('PricePointsModel', PricePointsSchema);
var PricePointModel = mongoose.model('PricePointModel', PricePointSchema);

module.exports = {
    PricePointsModel,
    PricePointModel
};