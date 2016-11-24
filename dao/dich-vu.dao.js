var HandleException = require('../util/handleException');
var DichVuEntity = require('../entity/dich-vu.entity');

var handleException = new HandleException("DichVuDao");

class DichVuDao {
    constructor() {}

    findDichVu(callback) {
        DichVuEntity.find({}).populate("files")
            .exec(function(err, dichvus){
                if (err) {
                    handleException.logMessageWithError("findDichVu", "DichVuEntity.find", err);
                    callback(err);
                } else {
                    if (dichvus.length > 0) {
                        callback(err, dichvus[0]);
                    } else {
                        callback(err, null);
                    }
                }
            });
    }

    findDichVuById(id, callback) {
        DichVuEntity.findOne({'_id':id}).populate("files")
            .exec(function(err, dichvu){
                if (err) {
                    handleException.logMessageWithError("findDichVuById", "DichVuEntity.findOne", err);
                    callback(err);
                } else {
                   if (dichvu) {
                        callback(err, dichvu);
                    } else {
                        callback(new Error("Thanh toan nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."));
                    }
                }
            });
    }
}

module.exports = new DichVuDao();