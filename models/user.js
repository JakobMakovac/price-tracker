var mongoose = require('mongoose');

var UserModel = mongoose.model(
    'UserModel', 
    new mongoose.Schema({
        id: String,
        username: String,
        email: String,
        password: String,
    })
);

module.exports = UserModel;