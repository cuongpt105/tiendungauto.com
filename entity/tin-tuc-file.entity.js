var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TinTucFileSchema   = new Schema({
    file: { type: Schema.Types.ObjectId, ref: 'FileSystem'}
});

module.exports = mongoose.model('TinTucFile', TinTucFileSchema);