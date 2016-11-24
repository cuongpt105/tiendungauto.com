var HandleException = require('../util/handleException');
var ThanhToanEntity = require('../entity/thanh-toan.entity');

var handleException = new HandleException("ThanhToanDao");

class ThanhToanDao {
    constructor() {}

    findThanhToan(callback) {
        ThanhToanEntity.find({}).populate("files")
            .exec(function(err, thanhtoans){
                if (err) {
                    handleException.logMessageWithError("findThanhToan", "ThanhToanEntity.find", err);
                    callback(err);
                } else {
                    if (thanhtoans.length > 0) {
                        callback(err, thanhtoans[0]);
                    } else {
                        callback(err, null);
                    }
                }
            });
    }

    findThanhToanById(id, callback) {
        ThanhToanEntity.findOne({'_id':id}).populate("files")
            .exec(function(err, thanhtoan){
                if (err) {
                    handleException.logMessageWithError("findThanhToanById", "ThanhToanEntity.findOne", err);
                    callback(err);
                } else {
                   if (thanhtoan) {
                        callback(err, thanhtoan);
                    } else {
                        callback(new Error("Thanh toan nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."));
                    }
                }
            });
    }
}

module.exports = new ThanhToanDao();