var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ThanhToanSchema   = new Schema({
    content: String,
    files: [{ type:  Schema.Types.ObjectId, ref: 'FileSystem' }]
});

module.exports = mongoose.model('ThanhToan', ThanhToanSchema);