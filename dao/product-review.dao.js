var HandleException = require('../util/handleException');
var ProductReviewEntity = require('../entity/product-review.entity');

var handleException = new HandleException("ProductReviewDao");

class ProductReviewDao {
    constructor() {}

    getAllReviewsByProduct(productId, callback) {
        ProductReviewEntity.find({'productId': productId})
            .sort({date: -1})
            .exec(function(err, reviews){
                if (err) {
                    handleException.logMessageWithError("getAllReviewsByProduct", "ProductReviewEntity.find({'productId': productId})", err);
                    callback(err);
                } else {
                    callback(err, reviews);
                }
            });
    }
}

module.exports = new ProductReviewDao();