var HandleException = require('../util/handleException');
var commonUtil = require('../util/commonUtil');

var DanhMucEntity = require('../entity/danh-muc.entity');
var FileSystemEntity = require('../entity/file-system.entity');
var ProductEntity = require('../entity/product.entity');
var Product = require('../model/product.model');

var productDao = require('../dao/product.dao');

var DanhMucService = require('../service/danh-muc.service');
var FileSystemService = require('../service/file-system.service');
var async = require('async');

var handleException = new HandleException("ProductService");
var danhMucService = new DanhMucService();

module.exports = class ProductService {
    constructor(){}

    findProductsOfDanhMuc(danhmucId, callback) {
        productDao.findProductsOfDanhMuc(danhmucId, function(err, productEntities){
            if (err) {
                handleException.logMessageWithError("findProductsOfDanhMuc", "productDao.findProductsOfDanhMuc", err);
                callback(err);
            } else {
                callback(err, ProductService.convertEntitiesToModels(productEntities));
            }
        });
    }

    findProductsActiveByDanhMuc(danhmucId, callback) {
        productDao.findProductsActiveByDanhMuc(danhmucId, function(err, productEntities){
            if (err) {
                handleException.logMessageWithError("findProductsActiveByDanhMuc", "productDao.findProductsActiveByDanhMuc", err);
                callback(err);
            } else {
                callback(err, ProductService.convertEntitiesToModels(productEntities));
            }
        });
    }

    findProductsWithPaginateOfDanhMucs(danhMucIds, pageOptions, callback) {
        productDao.findProductsWithPaginateOfDanhMucs(danhMucIds, pageOptions, function(err, productEntities){
            if (err) {
                handleException.logMessageWithError("findProductsWithPaginateOfDanhMucs", "productDao.findProductsWithPaginateOfDanhMucs", err);
                callback(err);
            } else {
                callback(err, ProductService.convertEntitiesToModels(productEntities));
            }
        });
    }

    // find all products that is latest base on a field of product
    findLatestProductsActiveBySpecifyField(limit, fieldOrderBy, callback) {
        let products = [];
        fieldOrderBy = commonUtil.getOrderByField(fieldOrderBy) 
        productDao.findLatestProductsActiveBySpecifyField(limit, fieldOrderBy, function(err, productEntities){
            if (err) {
                handleException.logMessageWithError("findLatestProductsActiveBySpecifyField", "productDao.findLatestProductsActiveBySpecifyField", err);
                callback(err);
            } else {
                callback(err, ProductService.convertEntitiesToModels(productEntities));
            }
        });
    }

    findProductsByDanhMuc(danhMucId, limit, currentPage, fieldOrderBy, callback) {
        let products = [];
        let dmIds = [];
        async.series([
            // load this danhmuc and children of this danhmuc
            function(cb) {
                danhMucService.findDanhMucsIncludeChidlrenAsListById(danhMucId, function(err, dms){
                    if (err) cb(err);

                    for (let dm of dms) {
                        dmIds.push(dm.id);
                    }
                    cb();
                });
            },

            // load all product of these danh muc
            function(cb){
                if ( dmIds.length > 0) {
                    let productService = new ProductService();
                    var pageOptions = {
                        page: Number(currentPage) || 0,
                        limit: Number(limit) || 10,
                        fieldOrderBy: commonUtil.getOrderByField(fieldOrderBy) 
                    }
                    productService.findProductsWithPaginateOfDanhMucs(dmIds, pageOptions, function(err, pds){
                        if (err) cb(err);

                        for (let pd of pds) {
                            // remember to get rating for each product; and default set is 4.5
                            pd.rating = 4.5;
                            products.push(pd);
                        }
                        
                        cb();
                    });
                } else {
                    cb();
                }
            }
        ],

        // final send all products back to place call this function
        function(err){
            if (err) callback(err);

            callback(err, products);
        });
    }

    findProductsActive(callback) {
        productDao.findAllProductsActive(function(err, productEntities){
            if (err) {
                handleException.logMessageWithError("getProductsActive", "productDao.findAllProductsActive", err);
                callback(err);
            } else {
                callback(err, ProductService.convertEntitiesToModels(productEntities));
            }
        });
    }

    findAllProduct(callback) {
        productDao.findAllProducts(function(err, productEntities){
            if (err) {
                handleException.logMessageWithError("findAllProduct", "productDao.findAllProducts", err);
                callback(err);
            } else {
                callback(err, ProductService.convertEntitiesToModels(productEntities));
            }
        });
    }

    

    findProductById(id, callback) {
        productDao.findProductById(id, function(err, productEntity){
            if (err) {
                handleException.logMessageWithError("findProductById", "productDao.findProductById", err);
                callback(err);
            } else {
                if (productEntity) {
                    callback(err, ProductService.convertEntityToModel(productEntity));
                } else {
                    callback(new Error("San pham nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."))
                }
            }
            
        });
    }

    deleteProduct(id, callback) {
        productDao.findProductById(id, function(err, productEntity){
            if (err) {
                handleException.logMessageWithError("deleteProduct", "productDao.findProductById", err);
                callback(err);   
            } else {
                if (productEntity) {
                    ProductEntity.remove({_id: productEntity._id}, function(err, productDeleted){
                        if (err) {
                            handleException.logMessageWithError("DELETE /product/:product_id", "ProductEntity.remove", err);
                            res.status(500).send(err);    
                        } else {
                            let productService = new ProductService();
                            productService.findProductsOfDanhMuc(productEntity.danhmuc._id, function(err, products){
                                if (err) {
                                    handleException.logMessageWithError("DELETE /product/:product_id", "productService.findProductsOfDanhMuc", err);
                                    callback(err);   
                                } else {
                                    callback(err, products);
                                }
                            });
                        }
                    });
                } else {
                    let message = "San pham nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin";
                    handleException.logMessageWithError("deleteProduct", message, err);
                    callback(new Error(message));
                }
            }
        });
    }

    static convertEntityToModel(productEntity) {
        let danhmuc;
        let mainImage;
        let imagesDetail = [];
        
        if (productEntity.danhmuc) {
            danhmuc = DanhMucService.convertEntityToModel(productEntity.danhmuc);
        }

        if (productEntity.mainImage) {
            mainImage = FileSystemService.convertEntityToModel(productEntity.mainImage);
        }

        if (productEntity.imagesDetail && productEntity.imagesDetail.length > 0) {
            imagesDetail = FileSystemService.convertEntitiesToModels(productEntity.imagesDetail);
        }

        let product = new Product(productEntity._id, productEntity.name, productEntity.code,
                productEntity.shortDescription, productEntity.detailDescription,
                productEntity.priceOriginal, productEntity.priceSell, productEntity.pricePromotion,
                productEntity.position, productEntity.status, productEntity.producer, productEntity.quantity,
                productEntity.guarantee, productEntity.vat, productEntity.unit, 
                productEntity.seoTitle, productEntity.seoKeyword, productEntity.seoDescription, productEntity.isDraft, productEntity.modifyDate,
                danhmuc, mainImage, imagesDetail);
        
        return product;
    }

    static convertEntitiesToModels(productEntities) {
        let products = [];
        for (let productEntity of productEntities) {
            if (productEntity) {
                let product = ProductService.convertEntityToModel(productEntity);
                products.push(product);
            }
        }

        return products;
    }

    static convertRequestToEntityForNew(request) {
        let productEntity = new ProductEntity();
        productEntity.name = request.body.name;
        productEntity.code = request.body.code;
        productEntity.shortDescription = request.body.shortDescription;
        productEntity.detailDescription = request.body.detailDescription;
        productEntity.priceOriginal = request.body.priceOriginal;
        productEntity.priceSell = request.body.priceSell;
        productEntity.pricePromotion = request.body.pricePromotion;
        productEntity.position = request.body.position;
        productEntity.status = request.body.status;
        productEntity.producer = request.body.producer;
        productEntity.quantity = request.body.quantity;
        productEntity.guarantee = request.body.guarantee;
        productEntity.vat = request.body.vat;
        productEntity.unit = request.body.unit;
        productEntity.seoTitle = request.body.seoTitle;
        productEntity.seoKeyword = request.body.seoKeyword;
        productEntity.seoDescription = request.body.seoDescription;
        productEntity.isDraft = request.body.isDraft;

        ProductService.convertRequestToDanhMuc(productEntity, request);
        ProductService.convertRequestToFile(productEntity, request);
        ProductService.convertRequestToFiles(productEntity, request);

        return productEntity;
    }

    static convertRequestToEntityForUpdate(productEntity, req) {
        productEntity = Object.assign(productEntity, req.body);

        ProductService.convertRequestToDanhMuc(productEntity, req);
        ProductService.convertRequestToFile(productEntity, req);
        ProductService.convertRequestToFiles(productEntity, req);
        
        return productEntity;
    }

    static convertRequestToDanhMuc(entity, req) {
        if (req.body.danhmuc) {
            let danhmucEntity = new DanhMucEntity();
            danhmucEntity._id = req.body.danhmuc.id;
            entity.danhmuc = danhmucEntity;
        }
    }

    static convertRequestToFile(entity, req) {
        if (req.body.mainImage) {
            let fileuploadEntity = new FileSystemEntity();
            fileuploadEntity._id = req.body.mainImage.id;
            entity.mainImage = fileuploadEntity;
        }
    }

    static convertRequestToFiles(entity, req) {
        if (req.body.imagesDetail) {
            let imagesDetail = req.body.imagesDetail;
            if (imagesDetail.length > 0) {
                let files = [];
                for (let image of imagesDetail) {
                    let file = new FileSystemEntity();
                    file._id = image.id;
                    files.push(file);
                }

                entity.imagesDetail = files;
            }
        }
    }
}