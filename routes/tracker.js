var express = require('express');
var db = require('../database');
var bodyParser = require('body-parser');
var jwtauth = require('../middleware/jwtAuth');
const User = db.user;
const Tracker = db.tracker;

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/add', [jsonParser, jwtauth], function(req, res, next) {
    if (req.body.url && req.userId) {
        let _url = req.body.url.split('?')[0];
        Tracker.findOne({url: _url}).exec(function (err, tracker) {
            if (tracker) {
                res.sendStatus(409);
            } else {
                Tracker.create({
                    url: _url,
                    pricepoints: []
                })
                .then((data) => {
                    User.findOne({_id: req.userId}).exec(function (err, person) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else if (person) {
                            person.trackerIds.push(data._id);
                            person.save();
                            res.sendStatus(201);
                        }
                    });
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

router.get('/list', [jsonParser, jwtauth], function(req, res, next) {
    if (req.userId) {
        User.findOne({_id: req.userId}).exec(function (err, person) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else if (person && person.trackerIds) {
                let queryIds = person.trackerIds.map((trackerId) => {
                    return db.mongoose.Types.ObjectId(trackerId);
                })
                Tracker.find({'_id' : queryIds}, function (err, trackers) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.json({
                            trackers: trackers
                        });
                    }
                });
            }
        })
    } else {
        res.sendStatus(401);
    }
});

router.delete('/remove', [jsonParser, jwtauth], function(req, res, next) {
    if (req.userId && req.body.trackerId) {
        User.findOne({_id: req.userId}).exec(function (err, person) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else if (person && person.trackerIds) {
                person.trackerIds = person.trackerIds.filter((trackerId) => {
                    return trackerId !== req.body.trackerId;
                })
                person.save();
                Tracker.deleteOne({_id: req.body.trackerId}, function(err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;