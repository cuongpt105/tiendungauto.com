var HandleException = require('../util/handleException');

var ProductImageEntity = require('../entity/product-image.entity');
var ProductImage = require('../model/product-image.model');

var fileSystemService = require('./file-system.service');
var productImageDao = require('../dao/product-image.dao');
var productDao = require('../dao/product.dao');

var handleException = new HandleException("ProductImageService");

module.exports = class ProductImageService {
    constructor(){}

    getImagesFromProduct(productId, callback) {
        productImageDao.getAllImagesByProduct(productId, function(err, productImageEntities){
            if (err) {
                handleException.logMessageWithError("getImagesFromProduct", "productImageDao.getAllImagesByProduct", err);
                callback(err);
            } else {
                callback(err, ProductImageService.convertEntitiesToModels(productImageEntities));
            }
        });
    }

    deleteProductImageById(id, callback) {
        productImageDao.findProductImageById(id, function(err, productImageEntity){
            if (err) {
                handleException.logMessageWithError("deleteProductImageById", "productImageDao.findProductImageById", err);
                callback(err);
            } else {
                if (productImageEntity) {
                    let fileId = ""+productImageEntity.file._id;

                    productDao.findProductById(productImageEntity.productId, function(err, productEntity){
                        let isUsed = false;
                        if (productEntity) {
                            // if this file already used in product, then can not delete
                            if (productEntity.mainImage) {
                                let mainFileId = ""+productEntity.mainImage._id;
                                isUsed = fileId === mainFileId;
                            }

                            if (productEntity.imagesDetail) {
                                let imagesDetail = productEntity.imagesDetail;
                                for (let file of imagesDetail) {
                                    let imageDetailId = ""+file._id;
                                    isUsed = isUsed || (fileId === imageDetailId);
                                }
                            }
                        }

                        if (isUsed) {
                            callback(new Error("Anh nay da duoc su dung o san pham. Lam on khong xoa file nay hoac xoa file nay o nhung noi da su dung no."));
                        } else {
                            ProductImageEntity.remove({_id:id}, function(err){
                                if (err) {
                                    handleException.logMessageWithError("deleteProductImageById", "ProductImageEntity.remove", err);
                                    callback(err);
                                } else {
                                    let proImageService = new ProductImageService();
                                    proImageService.getImagesFromProduct(productImageEntity.productId, function(err, productImages){
                                        if (err) {
                                            handleException.logMessageWithError("deleteProductImageById", "proImageService.getImagesFromProduct", err);
                                            callback(err);
                                        } else {
                                            callback(err, productImages);
                                        }

                                    }); // end proImageService.getImagesFromProduct
                                }

                            }); // end ProductImageEntity.remove
                        }

                    }); // end productDao.findProductById
                } else {
                    callback(new Error("This file khong ton tai trong he thong. Lam on thong bao loi nay toi admin."))
                }
            }             
        });
    }

    static convertEntityToModel(entity) {
        let file = fileSystemService.convertEntityToModel(entity.file);
        let productImage = new ProductImage(entity._id, entity.productId, file);
        return productImage;
    }

    static convertEntitiesToModels(productImageEntities) {
        var productImages = [];
        for (let entity of productImageEntities) {
            let productImage = ProductImageService.convertEntityToModel(entity);
            productImages.push(productImage);
        }

        return productImages;
    }
}