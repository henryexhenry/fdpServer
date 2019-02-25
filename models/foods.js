const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const foodSchema = new Schema({
    name_eng: {
        type: String,
        required: true,
        unique: true
    },
    name_cn: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    uploaderType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:false
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