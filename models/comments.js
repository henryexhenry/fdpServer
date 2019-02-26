const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    _id: mongoose.Types.Schema.ObjectId,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments:[{
        // comments of a comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
},{
    timestamps: true,
    usePushEach: true
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;