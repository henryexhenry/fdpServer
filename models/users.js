var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String,
        default: ''
    },
    admin:{
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);


// create model
var Users = mongoose.model('User', User);

module.exports = Users;
