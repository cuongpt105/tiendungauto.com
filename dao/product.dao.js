var HandleException = require('../util/handleException');
var ProductEntity = require('../entity/product.entity');

var handleException = new HandleException("ProductDao");

class ProductDao {
    constructor() {}

    findProductsOfDanhMuc(danhmucId, callback) {
        ProductEntity.find({danhmuc: danhmucId, isDraft: false})
            .populate("danhmuc mainImage imagesDetail")
            .exec(function(err, products){
                if (err) {
                    handleException.logMessageWithError("findProductsOfDanhMuc", "ProductEntity.find", err);
                    callback(err);
                } else {
                    callback(err, products);
                }
            });
    }

    findProductsActiveByDanhMuc(danhmucId, callback) {
        ProductEntity.find({danhmuc: danhmucId, isDraft: false, status: 'PUBLIC'})
            .populate("danhmuc mainImage imagesDetail")
            .exec(function(err, products){
                if (err) {
                    handleException.logMessageWithError("findProductsOfDanhMuc", "ProductEntity.find", err);
                    callback(err);
                } else {
                    callback(err, products);
                }
            });
    }

    // find all products that is latest base on a field of product
    findLatestProductsActiveBySpecifyField(limit, fieldOrderBy, callback) {
        ProductEntity.find({isDraft: false})
            .populate("danhmuc mainImage imagesDetail")
            .limit(limit)
            .sort(fieldOrderBy)
            .exec(function(err, products){
                if (err) {
                    handleException.logMessageWithError("findProductsWithPaginateOfDanhMucs", "ProductEntity.find", err);
                    callback(err);
                } else {
                    callback(err, products);
                }
            });
    }

    findProductsWithPaginateOfDanhMucs(danhmucIds, pageOptions, callback) {
        ProductEntity.find({danhmuc: { $in: danhmucIds }, isDraft: false, })
            .populate("danhmuc mainImage imagesDetail")
            .skip(pageOptions.page*pageOptions.limit)
            .limit(pageOptions.limit)
            .sort(pageOptions.fieldOrderBy)
            .exec(function(err, products){
                if (err) {
                    handleException.logMessageWithError("findProductsWithPaginateOfDanhMucs", "ProductEntity.find", err);
                    callback(err);
                } else {
                    callback(err, products);
                }
            });
    }

    findAllProductsActive(callback) {
        ProductEntity.find({isDraft: false, status: 'PUBLIC'})
            .populate("danhmuc mainImage imagesDetail")
            .exec(function(err, products){
                if (err) {
                    handleException.logMessageWithError("findAllProductsActive", "ProductEntity.find", err);
                    callback(err);
                } else {
                    callback(err, products);
                }
            });
    }

    findAllProducts(callback) {
        ProductEntity.find({}).populate("danhmuc mainImage imagesDetail")
            .exec(function(err, products){
                if (err) {
                    handleException.logMessageWithError("findAllProducts", "ProductEntity.find", err);
                    callback(err);
                } else {
                    callback(err, products);
                }
            });
    }

    findProductById(id, callback) {
        ProductEntity.findOne({'_id':id}).populate("danhmuc mainImage imagesDetail")
            .exec(function(err, product){
                if (err) {
                    handleException.logMessageWithError("findProductById", "ProductEntity.findOne", err);
                    callback(err);
                } else {
                    if (product) {
                        callback(err, product);
                    } else {
                        callback(new Error("San pham nay khong ton tai trong he thong. Lam on thong bao loi nay voi admin."));
                    }
                }
            });
    }
}

module.exports = new ProductDao();