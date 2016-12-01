var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GallerySchema   = new Schema({
    position: Number,
    title: String,
    image: { type: Schema.Types.ObjectId, ref: 'FileSystem' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('Gallery', GallerySchema);