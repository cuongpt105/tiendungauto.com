var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GioiThieuSchema   = new Schema({
    content: String,
    files: [{ type:  Schema.Types.ObjectId, ref: 'FileSystem' }]
});

module.exports = mongoose.model('GioiThieu', GioiThieuSchema);