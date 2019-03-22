var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    //_id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    },
    image:{
        type: String,
        default: ''
    },
    age:{
        type: Number,
        min: 0,
        max: 100,
        required: false
    },
    description:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        default: ''
    },
    phoneNumber:{type: Number},
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes:{
        foods:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        }],
        restaurants:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }],
        posts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
    },
    saves:{
        foods:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        }],
        restaurants:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }],
        posts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }]
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
});

User.plugin(passportLocalMongoose);


// create model
var Users = mongoose.model('User', User);

module.exports = Users;
