var mongoose = require('mongoose');

var UserModel = mongoose.model(
    'UserModel', 
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        trackerIds: [String]
    })
);

module.exports = UserModel;