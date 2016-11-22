var HandleException = require('../util/handleException');

var ThanhToanEntity = require('../entity/thanh-toan.entity');
var ThanhToan = require('../model/thanh-toan.model');

var thanhtoanDao = require('../dao/thanh-toan.dao');

var FileSystemService = require('../service/file-system.service');

var handleException = new HandleException("ThanhToanService");

module.exports = class ThanhToanService {
    constructor(){}

    findThanhToan(callback) {
        thanhtoanDao.findThanhToan(function(err, thanhtoanEntity){
            if (err) {
                handleException.logMessageWithError("findThanhToan", "thanhtoanDao.findThanhToan", err);
                callback(err);
            } else {
                if (thanhtoanEntity) {
                    let thanhtoan = ThanhToanService.convertEntityToModel(thanhtoanEntity);
                    callback(err, thanhtoan);
                } else {
                    callback(err, new ThanhToan());
                }
            }
        });
    }

    findThanhToanById(id, callback) {
        thanhtoanDao.findThanhToanById(function(err, thanhtoanEntity){
            if (err) {
                handleException.logMessageWithError("findThanhToan", "thanhtoanDao.findThanhToanById", err);
                callback(err);
            } else {
                if (thanhtoanEntity) {
                    let trangchu = ThanhToanService.convertEntityToModel(thanhtoanEntity);
                    callback(err, trangchu);
                } else {
                    callback(new Error("Thanh toan nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."));
                }
            }
        });
    }

    static convertEntityToModel(thanhtoanEntity) {
        let files = [];
        if (thanhtoanEntity.files.length > 0) {
            files = FileSystemService.convertEntitiesToModels(thanhtoanEntity.files);
        }
        
        let thanhtoan = new ThanhToan(thanhtoanEntity._id, thanhtoanEntity.content, files);
        return thanhtoan;
    }
}