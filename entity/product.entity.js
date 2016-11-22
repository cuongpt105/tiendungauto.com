var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
    name: String,
    code: String,
    shortDescription: String,
    detailDescription: String,
    danhmuc: { type: Schema.Types.ObjectId, ref: 'DanhMuc'},
    priceOriginal: Number,
    priceSell: Number,
    pricePromotion: Number,
    position: Number,
    status: String,
    producer: String,
    quantity: Number,
    guarantee: String,
    mainImage: { type: Schema.Types.ObjectId, ref: 'FileSystem'},
    imagesDetail: [{ type: Schema.Types.ObjectId, ref: 'FileSystem'}],
    vat: Number,
    unit: String,
    seoTitle: String,
    seoKeyword: String,
    seoDescription: String,
    isDraft: Boolean,
    modifyDate: { type: Date, default: Date.now }
});

ProductSchema.pre('save', function(next){
    this.modifyDate = new Date();
    next()
})


module.exports = mongoose.model('Product', ProductSchema);
