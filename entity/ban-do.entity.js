var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BanDoSchema   = new Schema({
    title: String,
    address: String,
    phone: String,
    email: String,
    website: String,
    map: String
});

module.exports = mongoose.model('BanDo', BanDoSchema);