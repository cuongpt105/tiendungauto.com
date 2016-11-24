var HandleException = require('../util/handleException');
var DanhMucEntity = require('../entity/danh-muc.entity');

var handleException = new HandleException("DanhMucDao");

class DanhMucDao {
    constructor() {}

    findDanhMucs(callback) {
        DanhMucEntity.find({})
            .sort({level: 1, position: 1})
            .exec(function(err, danhmucs){
                if (err) {
                    handleException.logMessageWithError("findDanhMucs", "DanhMucEntity.find", err);
                    callback(err);
                } else {
                    callback(err, danhmucs);
                }
            });
    }

    findDanhMucsAtRoot(callback) {
        DanhMucEntity.find({"level": 1})
            .sort({ position: 1 })
            .exec(function(err, danhmucs){
                if (err) {
                    handleException.logMessageWithError("findDanhMucsAtRoot", "DanhMucEntity.find", err);
                    callback(err);
                } else {
                    callback(err, danhmucs);
                }
            });
    }

    findDanhMucsOfParent(parentId,callback) {
        DanhMucEntity.find({"parentId": parentId})
            .sort({ position: 1 })
            .exec(function(err, danhmucs){
                if (err) {
                    handleException.logMessageWithError("findDanhMucsOfParent", "DanhMucEntity.find", err);
                    callback(err);
                } else {
                    callback(err, danhmucs);
                }
            });
    }

    findDanhMucById(danhmucId, callback) {
        DanhMucEntity.findOne({'_id':danhmucId}).exec(function(err, danhmucEntity){
            if (err) {
                handleException.logMessageWithError("findDanhMucById", "DanhMucEntity.findOne", err);
                callback(err);
            } else {
                if (danhmucEntity) {
                    callback(err, danhmucEntity);
                } else {
                    let message = "Danh muc nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin.";
                    handleException.logMessageWithError("findDanhMucById", message, err);
                    callback(new Error(message));
                }
            }
        });
    }
}

module.exports = new DanhMucDao();