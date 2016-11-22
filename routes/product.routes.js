var HandleException = require('../util/handleException');

var ProductEntity = require('../entity/product.entity');
var Product = require('../model/product.model');

var productDao = require('../dao/product.dao');
var ProductService = require('../service/product.service');
var async = require('async');

module.exports = (app, router) => {
    let productService = new ProductService();
    let handleException = new HandleException("productRouter");

    router.route("/danhmuc/:danhmucId/product")
        .post(function(req, res){
            let product = ProductService.convertRequestToEntityForNew(req);

            product.save(function(err, productEntity){
                if (err) {
                    handleException.logMessageWithError("POST /danhmuc/:danhmucId/product", "product.save", err);
                    res.status(500).send(err);    
                }

                res.json(ProductService.convertEntityToModel(productEntity));
            });
        })

        .get(function(req, res) {
            productService.findProductsOfDanhMuc(req.params.danhmucId, function(err, products){
                if (err) {
                    handleException.logMessageWithError("GET /danhmuc/:danhmucId/product", "productService.findProductsOfDanhMuc", err);
                    res.status(500).send(err);    
                }
                
                res.json(products);
            });
        });

    router.route("/product/:product_id")
        .get(function(req, res){
            productService.findProductById(req.params.product_id, function(err, product){
                if (err) {
                    handleException.logMessageWithError("GET /product/:product_id", "productService.findProductById", err);
                    res.status(500).send(err);    
                }

                res.json(product);
            });
        })

        .put(function(req,res){
            ProductEntity.findById(req.params.product_id, function(err, productEntity){
                if (err) {
                    handleException.logMessageWithError("PUT /product/:product_id", "ProductEntity.findById", err);
                    res.status(500).send(err);    
                }

                productEntity = ProductService.convertRequestToEntityForUpdate(productEntity, req);
                productEntity.isDraft = false;

                productEntity.save(function(err){
                    if (err) {
                        handleException.logMessageWithError("PUT /product/:product_id", "productEntity.save", err);
                        res.status(500).send(err);    
                    }

                    res.json(ProductService.convertEntityToModel(productEntity));
                });
            });
        })

        .delete(function(req, res){
            productService.deleteProduct(req.params.product_id, function(err, products){
                if (err) {
                    handleException.logMessageWithError("DELETE /product/:product_id", "productService.deleteProduct", err);
                    res.status(500).send(err);    
                }

                res.json(products);
            });
        });

    router.route("/products")
        .get(function(req, res){
            let danhMucId = req.query.danhMucId;
            let limit = req.query.limit;
            let currentPage = req.query.currentPage;
            let fieldOrderBy = req.query.fieldOrderBy;

            if (danhMucId) {
                productService.findProductsByDanhMuc(danhMucId, parseInt(limit), currentPage, fieldOrderBy, function(err, products){
                    if (err) {
                        handleException.logMessageWithError("GET /products", "productService.findProductsByDanhMuc", err);
                        res.status(500).send(err);    
                    }
                    
                    res.json(products);
                });
            } else {
                if (limit && fieldOrderBy) {
                    productService.findLatestProductsActiveBySpecifyField(parseInt(limit), fieldOrderBy, function(err, products){
                        if (err) {
                            handleException.logMessageWithError("GET /products", "productService.findLatestProductsActiveBySpecifyField", err);
                            res.status(500).send(err);    
                        }
                        
                        res.json(products);
                    });
                } else {
                    productService.findProductsActive(function(err, products){
                        if (err) {
                            handleException.logMessageWithError("GET /products", "productService.findProductsActive", err);
                            res.status(500).send(err);    
                        }

                        res.json(products);
                    });
                }
                
            }
        });  

    router.route("/products/total-product")
        .get(function(req, res){
            let danhMucId = req.query.danhMucId;
            if (danhMucId) {
                productService.findProductsActiveByDanhMuc(danhMucId, function(err, products){
                    if (err) {
                        handleException.logMessageWithError("GET /products/total-product", "productService.findProductsActiveByDanhMuc", err);
                        res.status(500).send(err);    
                    }

                    res.json(products.length);
                });
            } else {
                productService.findProductsActive(function(err, products){
                    if (err) {
                        handleException.logMessageWithError("GET /products/total-product", "productService.findProductsActive", err);
                        res.status(500).send(err);    
                    }

                    res.json(products.length);
                });
            }
        })   
}