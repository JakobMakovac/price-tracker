var express = require('express');

const router = express.Router();

router.post('/add', function(req, res, next) {
    res.status(201).send();
});

router.get('/list', function(req, res, next) {
    res.status(201).send();
});

router.delete('/remove', function(req, res, next) {
    res.status(201).send();
});

module.exports = router;