var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductImageSchema   = new Schema({
    productId: String,
    file: { type: Schema.Types.ObjectId, ref: 'FileSystem'}
});

module.exports = mongoose.model('ProductImage', ProductImageSchema);
