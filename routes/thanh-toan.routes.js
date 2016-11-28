var HandleException = require('../util/handleException');
var uploadFile = require('../util/upload-file');
var commonUtil = require('../util/commonUtil');

var ThanhToanEntity = require('../entity/thanh-toan.entity');
var ThanhToan = require('../model/thanh-toan.model');

var fileSystemDao = require('../dao/file-system.dao');
var thanhtoanDao = require('../dao/thanh-toan.dao');

var ThanhToanService = require('../service/thanh-toan.service');
var FileSystemService = require('../service/file-system.service');

module.exports = (app, router) => {
    let thanhtoanService = new ThanhToanService();
    let handleException = new HandleException("ThanhToanRouter");

    router.route("/thanhtoan")
        .post(function(req, res){
            thanhtoanDao.findThanhToan(function(err, thanhtoanEntity){
                if (err) {
                    handleException.logMessageWithError("POST /thanhtoan", "thanhtoanDao.findThanhToan", err);
                    res.status(400).send(err);
                } else {
                    if (thanhtoanEntity) {
                        thanhtoanEntity.content = req.body.content;
                    } else {
                        thanhtoanEntity = new ThanhToanEntity();
                        thanhtoanEntity.content = req.body.content;
                    }

                    thanhtoanEntity.save(function(err, entity){
                        if (err) {
                            handleException.logMessageWithError("POST /thanhtoan", "thanhtoanEntity.save", err);
                            res.status(400).send(err);
                        } else {
                            thanhtoanService.findThanhToan(function(err, thanhtoan){
                                if (err) {
                                    handleException.logMessageWithError("POST /thanhtoan", "thanhtoanService.findThanhToan", err);
                                    res.status(400).send(err);
                                }
                                res.json(thanhtoan);
                            })
                        }                        
                    });
                }
            });
        })

        .get(function(req, res) {
            thanhtoanService.findThanhToan(function(err, thanhtoan){
                if (err) {
                    handleException.logMessageWithError("GET /thanhtoan", "thanhtoanService.findThanhToan", err);
                    res.status(400).send(err);
                }
                
                res.json(thanhtoan);
            })
        });

    router.route("/thanhtoan/files")
        .post(uploadFile().array("file-upload", 12), function(req, res){
            fileSystemDao.saveFiles(req.files, function(err, fileSystems){
                thanhtoanDao.findThanhToan(function(err, thanhtoanEntity){
                    if (err) {
                        handleException.logMessageWithError("POST /thanhtoan/files", "thanhtoanDao.findThanhToan", err);
                        res.status(400).send(err);
                    }
                   
                    if (thanhtoanEntity) {
                        let files = commonUtil.mergeCollection(thanhtoanEntity.files, fileSystems);
                        thanhtoanEntity.files = files;
                    } else {
                        thanhtoanEntity = new ThanhToanEntity();
                        thanhtoanEntity.files = fileSystems;
                    }

                    thanhtoanEntity.save(function(err, entity){
                        if (err) {
                            handleException.logMessageWithError("POST /thanhtoan/files", "thanhtoanEntity.save", err);
                            res.status(400).send(err);
                        } 
                        
                        res.json(FileSystemService.convertEntitiesToModels(entity.files));
                    });
                });
            });
        });

    router.route("/thanhtoan/:thanhtoan_id/files/:file_id")
        .delete(function(req, res) {
            thanhtoanDao.findThanhToanById(req.params.thanhtoan_id, function(err, thanhtoanEntity){
                if (err) {
                    handleException.logMessageWithError("DELETE /thanhtoan/:thanhtoan_id/files/:file_id", "thanhtoanDao.findThanhToanById", err);
                    res.status(400).send(err);
                }
                
                if (thanhtoanEntity) {
                    let files = thanhtoanEntity.files;
                    let filesAfterFilter = files.filter(file => (""+file._id) !== (""+req.params.file_id));
                    
                    if (files.length > filesAfterFilter.length) {
                        fileSystemDao.deleteFileSystemById(req.params.file_id);
                        thanhtoanEntity.files = filesAfterFilter;

                        thanhtoanEntity.save(function(err, entity) {
                            if (err) {
                                handleException.logMessageWithError("DELETE /thanhtoan/:thanhtoan_id/files/:file_id", "thanhtoanEntity.save", err);
                                res.status(400).send(err);
                            }
                                
                            res.json(FileSystemService.convertEntitiesToModels(filesAfterFilter));
                        });
                    } else {
                        let message = "File nay khong ton tai trong he thong. Lam on bao loi nay toi admin.";
                        handleException.logMessageWithoutError("DELETE /thanhtoan/:thanhtoan_id/files/:file_id", message);
                        res.status(400).send(message);
                    }
                } else {
                    let message = "Thanh toan nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin.";
                    handleException.logMessageWithoutError("DELETE /thanhtoan/:thanhtoan_id/files/:file_id", message);
                    res.status(400).send(message);
                }
            });
		});
}