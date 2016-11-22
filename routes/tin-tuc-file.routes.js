var HandleException = require('../util/handleException');

var uploadFile = require('../util/upload-file');

var TinTucFileEntity = require('../entity/tin-tuc-file.entity');
var TinTucFile = require('../model/tin-tuc-file.model');

var fileSystemDao = require('../dao/file-system.dao');
var tintucfileDao = require('../dao/tin-tuc-file.dao');

var TinTucFileService = require('../service/tin-tuc-file.service');
var FileSystemService = require('../service/file-system.service')

module.exports = (app, router) => {
    let tintucfileService = new TinTucFileService();
    let handleException = new HandleException("TinTucFileRouter");

    router.route("/tintucfile")
        .post(uploadFile().array("file-upload", 12), function(req, res){
            for (let file of req.files) {
                fileSystemDao.saveFileWithCallback(file,function(err, fileEntity){
                    if (err) {
                        handleException.logMessageWithError("POST /tintucfile", "fileSystemDao.saveFileWithCallback", err);
                        res.status(400).send(err);  
                    }

                    let tintucfileEntity = new TinTucFileEntity();
                    tintucfileEntity.file = fileEntity;
                    tintucfileEntity.save(function(err, ttfileEntity){
                        tintucfileService.getAllTinTucFiles(function(err, models){
                            if (err) {
                                handleException.logMessageWithError("POST /tintucfile", "tintucfileService.getAllTinTucFiles", err);
                                res.status(400).send(err);    
                            }

                            res.json(models);
                        });
                    })
                });
            } 
        })

        .get(function(req, res) {
            tintucfileService.getAllTinTucFiles(function(err, tintucfilesModel){
                if (err) {
                    handleException.logMessageWithError("GET /tintucfile", "tintucfileService.getAllTinTucFiles", err);
                    res.status(400).send(err);    
                }

                res.json(tintucfilesModel);
            })
        });

    router.route("/tintucfile/:tintucfile_id")
        .delete(function(req, res){
            tintucfileService.deleteTinTucFileById(req.params.tintucfile_id, function(err, tintucfiles){
                if (err) {
                    handleException.logMessageWithError("DELETE /tintucfile/:tintucfile_id", "tintucfileService.deleteTinTucFileById", err);
                    res.status(400).send(err);    
                }

                res.json(tintucfiles);
            });
		})

        .get(function(req, res){
            tintucfileDao.findTinTucFileById(req.params.tintucfile_id, function(err, tintucfile){
                res.json(tintucfile);
            });
        });
}