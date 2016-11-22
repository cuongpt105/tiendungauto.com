var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HeaderSchema   = new Schema({
    file: { type: Schema.Types.ObjectId, ref: 'FileSystem' }
});

module.exports = mongoose.model('Header', HeaderSchema);