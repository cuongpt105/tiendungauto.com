var HandleException = require('../util/handleException');
var TinTucFileEntity = require('../entity/tin-tuc-file.entity');

var handleException = new HandleException("TinTucFileDao");

class TinTucFileDao {
    constructor() {}

    findAllTinTucFiles(callback) {
        TinTucFileEntity.find({})
            .populate("file")
            .exec(function(err, tintucfiles){
                if (err) {
                    handleException.logMessageWithError("findAllTinTucFiles", "TinTucFileEntity.find", err);
                    callback(err);
                } else {
                    callback(err, tintucfiles);
                }
            });
    }

    findTinTucFileById(id, callback) {
        TinTucFileEntity.findOne({'_id':id}).populate("file")
            .exec(function(err, tintucfile){
                if (err) {
                    handleException.logMessageWithError("findTinTucFileById", "TinTucFileEntity.findOne", err);
                    callback(err);
                } else {
                    if (tintucfile) {
                        callback(err, tintucfile);
                    } else {
                        callback(new Error("File cua tin tuc nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin. "));
                    }
                }
            });
    }
}

module.exports = new TinTucFileDao();