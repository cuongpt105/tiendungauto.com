var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReviewSchema   = new Schema({
    productId: String,
    name: String,
    email: String,
    rate: Number,
    date: Date,
    comment: String
});

module.exports = mongoose.model('Review', ReviewSchema);
