const jwt = require('jwt-simple');

verifyToken = function (req, res, next) {
    if (req.headers && req.headers.authorization) {
        var auth = req.headers.authorization.split(' ');
        var token;

        if (auth.length === 2) {
            token = auth[1];
            try {
                var decoded = jwt.decode(token, 'test');
                if (decoded.expires <= Date.now()) {
                    res.end('Access token has expired', 401);
                } else {
                    req.userId = decoded.id;
                    req.username = decoded.username;
                    next();
                }
            } catch (err) {
                return res.sendStatus(401);
            }
        } else {
            return res.sendStatus(401);
        }
    } else {
        return res.sendStatus(401);
    }
}

module.exports = verifyToken;