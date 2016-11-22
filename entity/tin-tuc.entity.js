var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TinTucSchema   = new Schema({
    title: String,
    imageTitle: { type:  Schema.Types.ObjectId, ref: 'FileSystem' },
    createDate: Date,
    content: String
});

module.exports = mongoose.model('TinTuc', TinTucSchema);