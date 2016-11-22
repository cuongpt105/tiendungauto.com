var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DichVuSchema   = new Schema({
    content: String,
    files: [{ type:  Schema.Types.ObjectId, ref: 'FileSystem' }]
});

module.exports = mongoose.model('DichVu', DichVuSchema);