var HandleException = require('../util/handleException');

var DichVuEntity = require('../entity/dich-vu.entity');
var DichVu = require('../model/dich-vu.model');

var dichvuDao = require('../dao/dich-vu.dao');

var FileSystemService = require('../service/file-system.service');

var handleException = new HandleException("DichVuService");

module.exports = class DichVuService {
    constructor(){}

    findDichVu(callback) {
        dichvuDao.findDichVu(function(err, dichvuEntity){
            if (err) {
                handleException.logMessageWithError("findDichVu", "dichvuDao.findDichVu", err);
                callback(err);
            } else {
                if (dichvuEntity) {
                    let dichvu = DichVuService.convertEntityToModel(dichvuEntity);
                    callback(err, dichvu);
                } else {
                    callback(err, new DichVu());
                }
            }
        });
    }

    findDichVuById(id, callback) {
        dichvuDao.findDichVuById(function(err, dichvuEntity){
            if (err) {
                handleException.logMessageWithError("findDichVu", "dichvuDao.findDichVuById", err);
                callback(err);
            } else {
                if (dichvuEntity) {
                    let trangchu = DichVuService.convertEntityToModel(dichvuEntity);
                    callback(err, trangchu);
                } else {
                    callback(new Error("Thanh toan nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."));
                }
            }
        });
    }

    static convertEntityToModel(dichvuEntity) {
        let files = [];
        if (dichvuEntity.files.length > 0) {
            files = FileSystemService.convertEntitiesToModels(dichvuEntity.files);
        }
        
        let dichvu = new DichVu(dichvuEntity._id, dichvuEntity.content, files);
        return dichvu;
    }
}