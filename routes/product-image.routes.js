var HandleException = require('../util/handleException');

var uploadFile = require('../util/upload-file');

var ProductImageEntity = require('../entity/product-image.entity');
var ProductImage = require('../model/product-image.model');

var fileSystemDao = require('../dao/file-system.dao');
var productImageDao = require('../dao/product-image.dao');

var ProductImageService = require('../service/product-image.service');
var FileSystemService = require('../service/file-system.service')

module.exports = (app, router) => {
    let productImageService = new ProductImageService();
    let handleException = new HandleException("ProductImageRouter");

    router.route("/product/:productId/product-image")
        .post(uploadFile().array("file-upload", 12), function(req, res){
            let productImageEntities = [];
            for (let file of req.files) {
                let fileSystem = fileSystemDao.save(file);
                let productImageEntity = new ProductImageEntity();
                productImageEntity.productId = req.params.productId;
                productImageEntity.file = fileSystem._id;
                productImageEntities.push(productImageEntity);
            } 

            ProductImageEntity.insertMany(productImageEntities, function(err, resultEntities){
                if (err) {
                    handleException.logMessageWithError("POST /product/:productId/product-image", "ProductImageEntity.insertMany", err);
                    res.status(400).send(err);    
                } else {
                    productImageService.getImagesFromProduct(req.params.productId, function(err, productImages){
                        if (err) {
                            handleException.logMessageWithError("POST /product/:productId/product-image", "productImageService.getImagesFromProduct", err);
                            res.status(400).send(err);    
                        } else {
                            res.json(productImages);
                        }
                    });
                }
            });
        })

        .get(function(req, res) {
            productImageService.getImagesFromProduct(req.params.productId, function(err, productImages){
                if (err) {
                    handleException.logMessageWithError("POST /products/:productId/product-image", "productImageService.getImagesFromProduct", err);
                    res.status(400).send(err);    
                } else {
                    res.json(productImages);
                }
            });
        });

    router.route("/product-image/:productImageId")
        .delete(function(req, res){
            productImageService.deleteProductImageById(req.params.productImageId, function(err, productImages){
                if (err) {
                    handleException.logMessageWithError("DELETE /product-image/:productImageId", "productImageService.deleteProductImageById", err);
                    res.status(400).send(err);    
                } else {
                    res.json(productImages);
                }
            });
		});
}