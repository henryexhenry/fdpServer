const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const restaurantSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    image: {
        type: String,
        default: ''
    },
    coverImage: {
        type: String,
        default: ''
    },
    ranking:{
        //TODO
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    category: {
        // chinese Restaurant / japanese Restaurant / ...
        type: String,
        required: true
    },
    label: {
        // popular / new open / ...
        type: String,
        default: ''
    },
    tel: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: mongoose.Types.Schema.ObjectId,
        ref: 'Comment'
    }],
    savedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
},{
    timestamps: true,
    usePushEach: true
});

var Restaurants = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurants;