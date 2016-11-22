var HandleException = require('../util/handleException');

var FileSystemEntity = require('../entity/file-system.entity');
var TinTucEntity = require('../entity/tin-tuc.entity');
var TinTuc = require('../model/tin-tuc.model');

var tintucDao = require('../dao/tin-tuc.dao');

var FileSystemService = require('../service/file-system.service');

var handleException = new HandleException("TinTucService");

module.exports = class TinTucService {
    constructor(){}

    findAllTinTuc(callback) {
        tintucDao.findAllTinTucs(function(err, tintucEntities){
            if (err) {
                handleException.logMessageWithError("findAllTinTuc", "tintucDao.findAllTinTucs", err);
                callback(err);
            } else {
                callback(err, TinTucService.convertEntitiesToModels(tintucEntities));
            }
        });
    }

    findTinTucById(id, callback) {
        tintucDao.findTinTucById(id, function(err, tintucEntity){
            if (err) {
                handleException.logMessageWithError("findTinTucById", "tintucDao.findTinTucById", err);
                callback(err);
            } else {
                if (tintucEntity) {
                    callback(err, TinTucService.convertEntityToModel(tintucEntity));
                } else {
                    callback(new Error("Tin tuc nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."))
                }
            }
            
        });
    }

    static convertEntityToModel(tintucEntity) {
        let file = FileSystemService.convertEntityToModel(tintucEntity.imageTitle);
        let tintuc = new TinTuc(tintucEntity._id, tintucEntity.title,
                file, tintucEntity.createDate, tintucEntity.content);
        return tintuc;
    }

    static convertEntitiesToModels(tintucEntities) {
        let tintucs = [];
        for (let tintucEntity of tintucEntities) {
            let tintuc = TinTucService.convertEntityToModel(tintucEntity);
            tintucs.push(tintuc);
        }

        return tintucs;
    }
    
    static convertRequestToEntityForNew(req) {
        let tintuc = new TinTucEntity();
        tintuc.title = req.body.title;
        tintuc.createDate = new Date();
        tintuc.content = req.body.content;
        TinTucService.convertRequestToFile(tintuc, req);

        return tintuc;
    }

    static convertRequestToEntityForUpdate(tintucEntity, req) {
        tintucEntity = Object.assign(tintucEntity, req.body);
        TinTucService.convertRequestToFile(tintucEntity, req);

        return tintucEntity;
    }

    static convertRequestToFile(entity, req) {
        if (req.body.imageTitle) {
            let fileEntity = new FileSystemEntity();
            fileEntity._id = req.body.imageTitle.id;
            entity.imageTitle = fileEntity;
        }
    }
}