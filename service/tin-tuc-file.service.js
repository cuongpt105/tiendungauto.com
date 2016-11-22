var HandleException = require('../util/handleException');

var TinTucFileEntity = require('../entity/tin-tuc-file.entity');
var TinTucFile = require('../model/tin-tuc-file.model');

var fileSystemService = require('./file-system.service');
var tinTucFileDao = require('../dao/tin-tuc-file.dao');
var tintucDao = require('../dao/tin-tuc.dao');

var handleException = new HandleException("TinTucFileService");

module.exports = class TinTucFileService {
    constructor(){}

    getAllTinTucFiles(callback) {
        tinTucFileDao.findAllTinTucFiles(function(err, tintucfileEntities){
            if (err) {
                handleException.logMessageWithError("getAllTinTucFiles", "tinTucFileDao.findAllTinTucFiles", err);
                callback(err);
            } else {
                callback(err, TinTucFileService.convertEntitiesToModels(tintucfileEntities));
            }
        });
    }

    deleteTinTucFileById(id, callback) {
        tinTucFileDao.findTinTucFileById(id, function(err, tintucfileEntity){
            if (err) {
                handleException.logMessageWithError("deleteTinTucFileById", "tinTucFileDao.findTinTucFileById", err);
                callback(err);
            } else {
                 if (tintucfileEntity) {
                    let file_id = ""+tintucfileEntity.file._id;

                    tintucDao.findAllTinTucs(function(err, tintucEntities){
                        if (err) {
                            handleException.logMessageWithError("deleteTinTucFileById", "tintucDao.findAllTinTucs", err);
                            callback(err);
                        }

                        let fileExisting = tintucEntities.filter(file => file_id === (""+file.imageTitle._id));

                        if (fileExisting && fileExisting.length > 0) {
                            let message = "File nay da duoc sung dung o tin tuc. Lam on khong xoa file nay.";
                            handleException.logMessageWithError("deleteTinTucFileById", message, err);
                                    
                            callback(new Error(message));
                        } else {
                            // delete tin tuc file
                            TinTucFileEntity.remove({_id:id}, function(err){
                                if (err) {
                                    handleException.logMessageWithError("deleteTinTucFileById", "TinTucFileEntity.remove", err);
                                    callback(err);
                                }

                                tinTucFileDao.findAllTinTucFiles(function(err, tintucfileEntities){
                                    if (err) {
                                        handleException.logMessageWithError("deleteTinTucFileById", "tinTucFileDao.findAllTinTucFiles", err);
                                        callback(err);
                                    } else {
                                        callback(err, TinTucFileService.convertEntitiesToModels(tintucfileEntities));
                                    }
                                });
                            });
                        }
                    });
                }
            }
        });
    }

    static convertEntityToModel(entity) {
        let fileSystem = fileSystemService.convertEntityToModel(entity.file);
        let tintucfile = new TinTucFile(entity._id, fileSystem);
        return tintucfile;
    }

    static convertEntitiesToModels(tintucfileEntities) {
        var tintucfiles = [];
        for (let entity of tintucfileEntities) {
            let tintucfile = TinTucFileService.convertEntityToModel(entity);
            tintucfiles.push(tintucfile);
        }

        return tintucfiles;
    }
}