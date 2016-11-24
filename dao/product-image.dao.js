var HandleException = require('../util/handleException');
var ProductImageEntity = require('../entity/product-image.entity');

var handleException = new HandleException("ProductImageDao");

class ProductImageDao {
    constructor() {}

    getAllImagesByProduct(productId, callback) {
        ProductImageEntity.find({'productId': productId})
            .populate("file")
            .exec(function(err, images){
                if (err) {
                    handleException.logMessageWithError("getAllImagesByProduct", "ProductImageEntity.find({'productId': productId})", err);
                    callback(err);
                } else {
                    callback(err, images);
                }
            });
    }

    findProductImageById(id, callback) {
        ProductImageEntity.findOne({'_id':id}).populate("file")
            .exec(function(err, productImage){
                if (err) {
                     handleException.logMessageWithError("findProductImageById", "ProductImageEntity.findOne({'_id':id})", err);
                    callback(err);
                } else {
                    if (productImage) {
                        callback(err, productImage);
                    } else {
                        callback(new Error("Anh nay khong ton tai trong he thong. Lam on thong bao cho admin."));
                    }
                }
            });
    }
}

module.exports = new ProductImageDao();