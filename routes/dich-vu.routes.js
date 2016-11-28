var HandleException = require('../util/handleException');
var uploadFile = require('../util/upload-file');
var commonUtil = require('../util/commonUtil');

var DichVuEntity = require('../entity/dich-vu.entity');
var DichVu = require('../model/dich-vu.model');

var fileSystemDao = require('../dao/file-system.dao');
var dichvuDao = require('../dao/dich-vu.dao');

var DichVuService = require('../service/dich-vu.service');
var FileSystemService = require('../service/file-system.service');

module.exports = (app, router) => {
    let dichvuService = new DichVuService();
    let handleException = new HandleException("DichVuRouter");

    router.route("/dichvu")
        .post(function(req, res){
            dichvuDao.findDichVu(function(err, dichvuEntity){
                if (err) {
                    handleException.logMessageWithError("POST /dichvu", "dichvuDao.findDichVu", err);
                    res.status(400).send(err);
                } else {
                    if (dichvuEntity) {
                        dichvuEntity.content = req.body.content;
                    } else {
                        dichvuEntity = new DichVuEntity();
                        dichvuEntity.content = req.body.content;
                    }

                    dichvuEntity.save(function(err, entity){
                        if (err) {
                            handleException.logMessageWithError("POST /dichvu", "dichvuEntity.save", err);
                            res.status(400).send(err);
                        } else {
                            dichvuService.findDichVu(function(err, dichvu){
                                if (err) {
                                    handleException.logMessageWithError("POST /dichvu", "dichvuService.findDichVu", err);
                                    res.status(400).send(err);
                                }
                                res.json(dichvu);
                            })
                        }                        
                    });
                }
            });
        })

        .get(function(req, res) {
            dichvuService.findDichVu(function(err, dichvu){
                if (err) {
                    handleException.logMessageWithError("GET /dichvu", "dichvuService.findDichVu", err);
                    res.status(400).send(err);
                }
                
                res.json(dichvu);
            })
        });

    router.route("/dichvu/files")
        .post(uploadFile().array("file-upload", 12), function(req, res){
            fileSystemDao.saveFiles(req.files, function(err, fileSystems){
                dichvuDao.findDichVu(function(err, dichvuEntity){
                    if (err) {
                        handleException.logMessageWithError("POST /dichvu/files", "dichvuDao.findDichVu", err);
                        res.status(400).send(err);
                    }
                   
                    if (dichvuEntity) {
                        let files = commonUtil.mergeCollection(dichvuEntity.files, fileSystems);
                        dichvuEntity.files = files;
                    } else {
                        dichvuEntity = new DichVuEntity();
                        dichvuEntity.files = fileSystems;
                    }

                    dichvuEntity.save(function(err, entity){
                        if (err) {
                            handleException.logMessageWithError("POST /dichvu/files", "dichvuEntity.save", err);
                            res.status(400).send(err);
                        } 
                        
                        res.json(FileSystemService.convertEntitiesToModels(entity.files));
                    });
                });
            });
        });

    router.route("/dichvu/:dichvu_id/files/:file_id")
        .delete(function(req, res) {
            dichvuDao.findDichVuById(req.params.dichvu_id, function(err, dichvuEntity){
                if (err) {
                    handleException.logMessageWithError("DELETE /dichvu/:dichvu_id/files/:file_id", "dichvuDao.findDichVuById", err);
                    res.status(400).send(err);
                }
                
                if (dichvuEntity) {
                    let files = dichvuEntity.files;
                    let filesAfterFilter = files.filter(file => (""+file._id) !== (""+req.params.file_id));
                    
                    if (files.length > filesAfterFilter.length) {
                        fileSystemDao.deleteFileSystemById(req.params.file_id);
                        dichvuEntity.files = filesAfterFilter;

                        dichvuEntity.save(function(err, entity) {
                            if (err) {
                                handleException.logMessageWithError("DELETE /dichvu/:dichvu_id/files/:file_id", "dichvuEntity.save", err);
                                res.status(400).send(err);
                            }
                                
                            res.json(FileSystemService.convertEntitiesToModels(filesAfterFilter));
                        });
                    } else {
                        let message = "File nay khong ton tai trong he thong. Lam on bao loi nay toi admin.";
                        handleException.logMessageWithoutError("DELETE /dichvu/:dichvu_id/files/:file_id", message);
                        res.status(400).send(message);
                    }
                } else {
                    let message = "Thanh toan nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin.";
                    handleException.logMessageWithoutError("DELETE /dichvu/:dichvu_id/files/:file_id", message);
                    res.status(400).send(message);
                }
            });
		});
}