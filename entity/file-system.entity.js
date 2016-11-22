var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FileSystemSchema   = new Schema({
    fileName: String,
    originalName: String,
    size: Number
});

module.exports = mongoose.model('FileSystem', FileSystemSchema);