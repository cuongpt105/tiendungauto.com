var HandleException = require('../util/handleException');
var GioiThieuEntity = require('../entity/gioi-thieu.entity');

var handleException = new HandleException("GioiThieuDao");

class GioiThieuDao {
    constructor() {}

    findGioiThieu(callback) {
        GioiThieuEntity.find({}).populate("files")
            .exec(function(err, gioithieus){
                if (err) {
                    handleException.logMessageWithError("findGioiThieu", "GioiThieuEntity.find", err);
                    callback(err);
                } else {
                    if (gioithieus.length > 0) {
                        callback(err, gioithieus[0]);
                    } else {
                        callback(err);
                    }
                }
            });
    }

    findGioiThieuById(id, callback) {
        GioiThieuEntity.findOne({'_id':id}).populate("files")
            .exec(function(err, gioithieu){
                if (err) {
                    handleException.logMessageWithError("findGioiThieuById", "GioiThieuEntity.findOne", err);
                    callback(err);
                } else {
                   if (gioithieu) {
                        callback(err, gioithieu);
                    } else {
                        callback(new Error("Gioi thieu nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."));
                    }
                }
            });
    }
}

module.exports = new GioiThieuDao();