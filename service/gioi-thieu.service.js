var HandleException = require('../util/handleException');

var GioiThieuEntity = require('../entity/gioi-thieu.entity');
var GioiThieu = require('../model/gioi-thieu.model');

var gioithieuDao = require('../dao/gioi-thieu.dao');

var FileSystemService = require('../service/file-system.service');

var handleException = new HandleException("GioiThieuService");

module.exports = class GioiThieuService {
    constructor(){}

    findGioiThieu(callback) {
        gioithieuDao.findGioiThieu(function(err, gioithieuEntity){
            if (err) {
                handleException.logMessageWithError("findGioiThieu", "gioithieuDao.findGioiThieu", err);
                callback(err);
            } else {
                if (gioithieuEntity) {
                    let gioithieu = GioiThieuService.convertEntityToModel(gioithieuEntity);
                    callback(err, gioithieu);
                } else {
                    callback(err, new GioiThieu());
                }
            }
        });
    }

    findGioiThieuById(id, callback) {
        gioithieuDao.findGioiThieuById(function(err, gioithieuEntity){
            if (err) {
                handleException.logMessageWithError("findGioiThieu", "gioithieuDao.findGioiThieuById", err);
                callback(err);
            } else {
                if (gioithieuEntity) {
                    let gioithieu = GioiThieuService.convertEntityToModel(gioithieuEntity);
                    callback(err, gioithieu);
                } else {
                    callback(new Error("Gioi thieu nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."));
                }
            }
        });
    }

    static convertEntityToModel(gioithieuEntity) {
        let files = [];
        if (gioithieuEntity.files.length > 0) {
            files = FileSystemService.convertEntitiesToModels(gioithieuEntity.files);
        }
        
        let gioithieu = new GioiThieu(gioithieuEntity._id, gioithieuEntity.content, files);
        return gioithieu;
    }
}