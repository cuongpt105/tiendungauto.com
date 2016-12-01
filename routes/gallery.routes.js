var HandleException = require('../util/handleException');

var GalleryEntity = require('../entity/gallery.entity');
var Gallery = require('../model/gallery.model');

var GalleryService = require('../service/gallery.service');

module.exports = (app, router) => {
    let galleryService = new GalleryService();
    let handleException = new HandleException("GalleryRouter");

    router.route("/galleries")
        .post(function(req, res){
            galleryService.saveGallery(req, function(err, galleryModel){
                if (err) {
                    handleException.logMessageWithError("POST /galleries", "galleryService.saveGallery", err);
                    res.status(500).send(err);    
                }

                res.json(galleryModel);
            });
        })

        .get(function(req, res) {
            galleryService.getAllGalleries(function(err, galleries){
                if (err) {
                    handleException.logMessageWithError("GET /galleries", "galleryService.getAllGalleries", err);
                    res.status(500).send(err);    
                }

                res.json(galleries);
            });
        });

    router.route("/galleries/:gallery_id")
        .get(function(req, res){
            galleryService.getGalleryById(req.params.gallery_id, function(err, gallery){
                if (err) {
                    handleException.logMessageWithError("GET /galleries/:gallery_id", "galleryService.getGalleryById", err);
                    res.status(500).send(err);    
                }

                res.json(gallery);
            });
        })

        .put(function(req,res){
            galleryService.updateGallery(req, function(err, galleryModel){
                if (err) {
                    handleException.logMessageWithError("PUT /galleries/:gallery_id", "galleryService.updateGallery", err);
                    res.status(500).send(err);    
                } else {
                    res.json(galleryModel);
                }
            });
        })

        .delete(function(req, res){
            galleryService.deleteGallery(req.params.gallery_id, function(err, galleryEntity){
                if (err) {
                    handleException.logMessageWithError("DELETE /galleries/:gallery_id", "galleryService.deleteGallery", err);
                    res.status(500).send(err);    
                } else {
                    req.status(200).send("Delete successful.");
                }
            });
        });
}