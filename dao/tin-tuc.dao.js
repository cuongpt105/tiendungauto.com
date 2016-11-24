var HandleException = require('../util/handleException');
var TinTucEntity = require('../entity/tin-tuc.entity');

var handleException = new HandleException("TinTucDao");

class TinTucDao {
    constructor() {}

    findAllTinTucs(callback) {
        TinTucEntity.find({}).populate("imageTitle")
            .exec(function(err, tintucs){
                if (err) {
                    handleException.logMessageWithError("findAllTinTucs", "TinTucEntity.find", err);
                    callback(err);
                } else {
                    callback(err, tintucs);
                }
            });
    }

    findTinTucById(id, callback) {
        TinTucEntity.findOne({'_id':id}).populate("imageTitle")
            .exec(function(err, tintuc){
                if (err) {
                    handleException.logMessageWithError("findTinTucById", "TinTucEntity.findOne", err);
                    callback(err);
                } else {
                    if (tintuc) {
                        callback(err, tintuc);
                    } else {
                        callback(new Error("Tin tuc nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."));
                    }
                }
            });
    }
}

module.exports = new TinTucDao();