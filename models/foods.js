const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const foodSchema = new Schema({
    engName: {
        type: String,
        required: true,
        unique: true
    },
    chName: {
        type: String,
        required: true,
        unique: true
    },
    uploader: {
        type: String,
        required: true,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    savedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    image: {
        type: String,
        default: ''
    },
    category: {
        // sushi / noodle / hot-pot / drink / ...
        type: String,
        required: true
    },
    label: {
        // spicy / sweet / ...
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    unit:{
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    usePushEach: true
});

var Foods = mongoose.model('Food', foodSchema);

module.exports = Foods;