var HandleException = require('../util/handleException');

var GalleryEntity = require('../entity/gallery.entity');

var handleException = new HandleException("GalleryDao");

class GalleryDao {
    constructor() {}

    getAllGalleries(callback) {
        GalleryEntity.find({}).populate("image product")
            .sort('position')
            .exec(function(err, galleries){
                if (err) {
                    handleException.logMessageWithError("getAllGalleries", "GalleryEntity.find({})", err);
                    callback(err);
                } else {
                    callback(err, galleries);
                }
            });
    }

    getGalleryById(galleryId, callback) {
        GalleryEntity.findOne({'_id':galleryId})
            .populate("image product")
            .exec(function(err, gallery){
                if (err) {
                    handleException.logMessageWithError("getGalleryById", "GalleryEntity.findOne", err);
                    callback(err);
                } else {
                    if (gallery) {
                        callback(err, gallery);
                    } else {
                        callback(new Error("Gallery nay khong ton tai trong he thong. Lam on thong bao loi nay voi admin."));
                    }
                }
            });
    }
}

module.exports = new HeaderDao();