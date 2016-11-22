var HandleException = require('../util/handleException');
var uploadFile = require('../util/upload-file');
var commonUtil = require('../util/commonUtil');

var GioiThieuEntity = require('../entity/gioi-thieu.entity');
var GioiThieu = require('../model/gioi-thieu.model');

var fileSystemDao = require('../dao/file-system.dao');
var gioithieuDao = require('../dao/gioi-thieu.dao');

var GioiThieuService = require('../service/gioi-thieu.service');
var FileSystemService = require('../service/file-system.service');

module.exports = (app, router) => {
    let gioithieuService = new GioiThieuService();
    let handleException = new HandleException("GioiThieuRouter");

    router.route("/gioithieu")
        .post(function(req, res){
            gioithieuDao.findGioiThieu(function(err, gioithieuEntity){
                if (err) {
                    handleException.logMessageWithError("POST /gioithieu", "gioithieuDao.findGioiThieu", err);
                    res.status(400).send(err);
                }

                if (gioithieuEntity) {
                    gioithieuEntity.content = req.body.content;
                } else {
                    gioithieuEntity = new GioiThieuEntity();
                    gioithieuEntity.content = req.body.content;
                }

                gioithieuEntity.save(function(err, entity){
                    if (err) {
                        handleException.logMessageWithError("POST /gioithieu", "gioithieuEntity.save", err);
                        res.status(400).send(err);
                    }

                    gioithieuService.findGioiThieu(function(err, gioithieu){
                        if (err) {
                            handleException.logMessageWithError("POST /gioithieu", "gioithieuService.findGioiThieu", err);
                            res.status(400).send(err);
                        }
                        res.json(gioithieu);
                    })
                });
            });
        })

        .get(function(req, res) {
            gioithieuService.findGioiThieu(function(err, gioithieu){
                if (err) {
                    handleException.logMessageWithError("GET /gioithieu", "gioithieuService.findGioiThieu", err);
                    res.status(400).send(err);
                }
                
                res.json(gioithieu);
            })
        });

    router.route("/gioithieu/files")
        .post(uploadFile().array("file-upload", 12), function(req, res){
            fileSystemDao.saveFiles(req.files, function(err, fileSystems){
                gioithieuDao.findGioiThieu(function(err, gioithieuEntity){
                    if (err) {
                        handleException.logMessageWithError("POST /gioithieu/files", "gioithieuDao.findGioiThieu", err);
                        res.status(400).send(err);
                    }
                   
                    if (gioithieuEntity) {
                        let files = commonUtil.mergeCollection(gioithieuEntity.files, fileSystems);
                        gioithieuEntity.files = files;
                    } else {
                        gioithieuEntity = new GioiThieuEntity();
                        gioithieuEntity.files = fileSystems;
                    }

                    gioithieuEntity.save(function(err, entity){
                        if (err) {
                            handleException.logMessageWithError("POST /gioithieu/files", "gioithieuEntity.save", err);
                            res.status(400).send(err);
                        } 
                        
                        res.json(FileSystemService.convertEntitiesToModels(entity.files));
                    });
                });
            });
        });

    router.route("/gioithieu/:gioithieu_id/files/:file_id")
        .delete(function(req, res) {
            gioithieuDao.findGioiThieuById(req.params.gioithieu_id, function(err, gioithieuEntity){
                if (err) {
                    handleException.logMessageWithError("DELETE /gioithieu/:gioithieu_id/files/:file_id", "gioithieuDao.findGioiThieuById", err);
                    res.status(400).send(err);
                } else {
                    if (gioithieuEntity) {
                        let files = gioithieuEntity.files;
                        let filesAfterFilter = files.filter(file => (""+file._id) !== (""+req.params.file_id));
                        
                        if (files.length > filesAfterFilter.length) {
                            fileSystemDao.deleteFileSystemById(req.params.file_id);
                            gioithieuEntity.files = filesAfterFilter;

                            gioithieuEntity.save(function(err, entity) {
                                if (err) {
                                    handleException.logMessageWithError("DELETE /gioithieu/:gioithieu_id/files/:file_id", "gioithieuEntity.save", err);
                                    res.status(400).send(err);
                                }
                                    
                                res.json(FileSystemService.convertEntitiesToModels(filesAfterFilter));
                            });
                        } else {
                            let message = "File nay khong ton tai trong he thong. Lam on bao loi nay toi admin.";
                            handleException.logMessageWithoutError("DELETE /gioithieu/:gioithieu_id/files/:file_id", message);
                            res.status(400).send(message);
                        }
                    } else {
                        let message = "Gioi thieu nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin.";
                        handleException.logMessageWithoutError("DELETE /gioithieu/:gioithieu_id/files/:file_id", message);
                        res.status(400).send(message);
                    }
                }
            });
		});
}