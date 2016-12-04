var HandleException = require('../util/handleException');

var FileSystemEntity = require('../entity/file-system.entity');
var ProductEntity = require('../entity/product.entity');
var GalleryEntity = require('../entity/gallery.entity');
var Gallery = require('../model/gallery.model');

var galleryDao = require('../dao/gallery.dao');

var FileSystemService = require('../service/file-system.service');
var ProductService = require('../service/product.service');

var handleException = new HandleException("GalleryService");
var fileSystemService = new FileSystemService();

module.exports = class GalleryService {
    constructor() {}

    getAllGalleries(callback) {
        galleryDao.getAllGalleries(function(err, galleryEntities){
             if (err) {
                handleException.logMessageWithError("getAllGalleries", "galleryDao.getAllGalleries", err);
                callback(err);
            } else {
                let galleryModels = GalleryService.convertEntitiesToModels(galleryEntities);
                callback(err, galleryModels);
            }
        });
    }

    getGalleryById(galleryId, callback) {
        galleryDao.getGalleryById(galleryId, function(err, galleryEntity){
            if (err) {
                handleException.logMessageWithError("getGalleryById", "galleryDao.getGalleryById", err);
                callback(err);
            } else {
                let galleryModel = GalleryService.convertEntityToModel(galleryEntity);
                callback(err, galleryModel);
            }
        });
    }

    saveGallery(galleryReq, callback) {
        let galleryEntity = GalleryService.convertRequestToEntityForNew(galleryReq);

        galleryEntity.save(function(err, entity){
            if (err) {
                handleException.logMessageWithError("saveGallery", "galleryEntity.save", err);
                callback(err);  
            } else {
                GalleryEntity.populate(entity, 'image product', function(err) {
                    let galleryModel = GalleryService.convertEntityToModel(entity);
                    callback(err, galleryModel);
                });
            }
        });
    }

    updateGallery(galleryReq, callback) {
        GalleryEntity.findById(galleryReq.params.gallery_id, function(err, galleryEntity){
            if (err) {
                handleException.logMessageWithError("updateGallery", "GalleryEntity.findById", err);
                callback(err);    
            }

            galleryEntity = galleryService.convertRequestToEntityForUpdate(galleryEntity, req);

            galleryEntity.save(function(err){
                if (err) {
                    handleException.logMessageWithError("updateGallery", "galleryEntity.save", err);
                    callback(err);  
                } else {
                    let galleryModel = GalleryService.convertEntityToModel(galleryEntity);
                    callback(err, galleryEntity);
                }
            });
        });
    }

    deleteGallery(galleryId, callback) {
        galleryDao.getGalleryById(galleryId, function(err, galleryEntity){
            if (err) {
                handleException.logMessageWithError("deleteGallery", "Gallery.findOne", err);
                callback(err);
            } else {
                if (galleryEntity) {
                    galleryEntity.remove();
                    fileSystemService.deleteFileSystemById(galleryEntity.image._id, function(err, isDeleted){
                        if (err) {
                            handleException.logMessageWithError("deleteGallery", "fileSystemService.deleteFileSystemById", err);
                            callback(err);
                        } else {
                            callback(err, true);
                        }
                    });
                } else {
                    let message = "Error during delete gallery. This gallery is not existing in system. Please send this error to administrator.";
                    handleException.logMessageWithError("deleteGallery", "Gallery.findOne", message);
                    callback(new Error(message));
                }
            }
        });
    }

    static convertRequestToEntityForNew(req) {
        let gallery = new GalleryEntity();
        gallery.title = req.body.title;
        gallery.position = req.body.position;
        gallery.image = GalleryService.convertRequestToFile(req);
        gallery.product = GalleryService.convertRequestToProduct(req);

        return gallery;
    }

    static convertRequestToEntityForUpdate(galleryEntity, req) {
        galleryEntity.title = req.body.title;
        galleryEntity.position = req.body.position;
        galleryEntity.image = GalleryService.convertRequestToFile(req);
        galleryEntity.product = GalleryService.convertRequestToProduct(req);

        return galleryEntity;
    }

    static convertRequestToFile(req) {
        if (req.body.image) {
            let fileEntity = new FileSystemEntity();
            fileEntity._id = req.body.image.id;
            return fileEntity;
        }
    }

    static convertRequestToProduct(req) {
        if (req.body.product) {
            let productEntity = new ProductEntity();
            productEntity._id = req.body.product.id;
            return productEntity;
        }
    }

    static convertEntitiesToModels(galleryEntities) {
        let galleries = [];
        for (let galleryEntity of galleryEntities) {
            if (galleryEntity) {
                let galleryModel = GalleryService.convertEntityToModel(galleryEntity);
                galleries.push(galleryModel);
            }
        }

        return galleries;
    }

    static convertEntityToModel(galleryEntity) {
        let image = FileSystemService.convertEntityToModel(galleryEntity.image);
        let product = ProductService.convertEntityToModel(galleryEntity.product);
        product.mainImage = null;
        product.imagesDetail = [];
        product.detailDescription = "";
        product.danhmuc = null;
        product.shortDescription = "";

        let galleryModel = new Gallery(galleryEntity._id, galleryEntity.title, image, product, galleryEntity.position);
        return galleryModel;
    }
}