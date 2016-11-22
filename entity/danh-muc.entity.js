var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DanhMucSchema   = new Schema({
    name: String,
    description: String,
    position: Number,
    level: Number,
    status: Boolean,
    seoTitle: String,
    seoKeyword: String,
    seoDescription: String,
    parentId: String
});

module.exports = mongoose.model('DanhMuc', DanhMucSchema);