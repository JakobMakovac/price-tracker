var express = require('express');
var db = require('../database');
var bodyParser = require('body-parser');
var jwtauth = require('../middleware/jwtAuth');
const PricePointModel = require('../models/pricepoints').PricePointModel;
const PricePoints = db.pricePoint;

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/add', [jsonParser, jwtauth], function(req, res, next) {
    if (req.body.price && req.body.url && req.userId) {
        PricePoints.findOne(
            {url: req.body.url})
            .exec()
            .then(pricePoint => {
                const newPricePoint = new PricePointModel({
                    timestamp: new Date().toISOString(),
                    price: req.body.price
                });
                newPricePoint.save();
                pricePoint.pricepoints.push(newPricePoint._id);
                pricePoint.save();
                res.sendStatus(200);
            })
    } else {
        res.sendStatus(400);
    }
});

router.get('/list', [jsonParser, jwtauth], function(req, res, next) {
    if (req.body.trackerUrl && req.userId) {
        PricePoints.findOne({url : req.body.trackerUrl}, function(err, pricePoints) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                PricePointModel.find(
                    {
                        _id: {
                            $in: pricePoints.pricepoints
                        }
                    },
                    function(err, pricePontsArray) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.json({
                                pricepoints: pricePontsArray
                            })
                        }
                    }
                )
            }
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;