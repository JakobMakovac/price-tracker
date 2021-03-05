var express = require('express');
var db = require('../database');
var bodyParser = require('body-parser');
var jwtauth = require('../middleware/jwtAuth');
const User = db.user;
const Tracker = db.tracker;
const PricePoints = db.pricePoint;

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/add', [jsonParser, jwtauth], function(req, res, next) {
    if (req.body.url && req.userId) {
        let _url = req.body.url.split('?')[0];
        Tracker.findOne({watcherId: req.userId, url: _url}).exec(function (err, tracker) {
            if (tracker) {
                res.sendStatus(409);
            } else {
                Tracker.create({
                    name: req.body.name,
                    url: _url,
                    watcherId: req.userId
                })
                .then((data) => {
                    PricePoints.findOne({url: _url}).exec(function (err, pricePoints) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        }
                        if (!pricePoints) {
                            PricePoints.create({
                                url: _url,
                                pricepoints: []
                            })
                        }
                    })
                    res.sendStatus(201);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                });
            }
        });
    } else {
        res.sendStatus(400);
    }
});

router.put('/update', [jsonParser, jwtauth], function(req, res, next) {
    if (req.userId && req.body.tracker) {
        Tracker.findOne({watcherId: req.userId, _id: req.body.tracker._id}).exec(function (err, tracker) {
            if (tracker) {
                tracker.name = req.body.tracker.name;
                tracker.save();
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400);
    }
});

router.get('/list', [jsonParser, jwtauth], function(req, res, next) {
    if (req.userId) {
        Tracker.find({watcherId : req.userId}, function(err, trackers) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json({
                    trackers: trackers
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});

router.delete('/remove', [jsonParser, jwtauth], function(req, res, next) {
    if (req.userId && req.body.trackerId) {
        Tracker.deleteOne({_id: req.body.trackerId}, function(err, tracker) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;