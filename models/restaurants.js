const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const restaurantSchema = new Schema({
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
    description: {
        type: String
    },
    image: {
        type: String,
        required:false
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
        type: Number
    },
    address: {
        type: String,
        default: ''
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

var Restaurants = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurants;