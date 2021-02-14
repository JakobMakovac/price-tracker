var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var jwtauth = require('../middleware/jwtAuth');
var checkExistingUser = require('../middleware/checkExistingUser');
var bcrypt = require('bcryptjs');
var db = require('../database');
const User = db.user;

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/login', jsonParser, function(req, res, next) {
    User.findOne({username: req.body.username}).exec(function (err, person) {
        if (err) {
            res.status(500).json({message: 'Error during authentication'});
        } else if (!person) {
            res.status(401).json({message: 'Invalid login info.'});
        } else if (person) {
            if (bcrypt.compareSync(req.body.password, person.password)) {
                var token = jwt.encode({
                    id: person.id,
                    username: person.username,
                    expires: Date.now() + 1000 * 20
                }, 'test');

                res.json({
                    token: token,
                    userId: person.id,
                    username: person.username
                });
            } else {
                res.status(401).json({message: 'Invalid login info.'});
            }
        } else {
            res.status(500).json({message: 'Error during authentication'});
        }
    });
});

router.post('/register', [jsonParser, checkExistingUser], function(req, res, next) {
    if (req.body.username && req.body.password) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 4)
        }, function (err, person) {
            if (err) {
                res.status(400).json({message: 'Registration failed.'});
            } else {
                var token = jwt.encode({
                    id: person.id,
                    username: person.username,
                    expires: Date.now() + 1000 * 20
                }, 'test');

                res.status(201).json({
                    token: token,
                    userId: person.id,
                    username: person.username
                });
            }
        });
    } else {
        res.status(400).json({message: 'Invalid username or password.'});
    }
});

router.get('/verify', jwtauth, function(req, res, next) {
    res.json({message: 'Token is valid'});
})

module.exports = router;