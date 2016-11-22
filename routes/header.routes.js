var HandleException = require('../util/handleException');

var uploadFile = require('../util/upload-file');

var HeaderEntity = require('../entity/header.entity');
var FileSystemEntity = require('../entity/file-system.entity');

var fileSystemDao = require('../dao/file-system.dao');
var headerDao = require('../dao/header.dao');

var HeaderService = require('../service/header.service');
var async = require('async');

module.exports = (app, router) => {
    let headerService = new HeaderService();
    let handleException = new HandleException("HeaderRouter");

    router.route('/headers')
        .post(uploadFile().array("file-upload", 12), function(req, res) {            
            let fileSystem = fileSystemDao.save(req.files[0]);

            headerDao.findHeader(function(err, headerEntity) {
                if (err) {
                    handleException.logMessageWithError("POST /header", "headerDao.findHeader", err);
                    res.status(400).send(err);    
                }

                if (headerEntity.file) {
                    fileSystemDao.deleteFileSystemById(headerEntity.file._id);
                }

                headerEntity.file = fileSystem;
                headerEntity.save(function(err){
                    if (err) {
                        handleException.logMessageWithError("POST /header", "headerEntity.save", err);
                        res.status(400).send(err);    
                    } else {
                         headerService.findHeader(function(err,headerModel){
                            if (err) {
                                handleException.logMessageWithError("POST /header", "headerService.findHeader", err);
                                res.status(400).send(err);    
                            }

                            res.json(headerModel);
                        })
                    }
                });    
            });
        })
        
        .get(function(req, res) {
            headerService.findHeader(function(err, header) {
                if (err) {
                    handleException.logMessageWithError("GET /header", "headerService.findHeader", err);
                    res.status(400).send(err);    
                }
                
                res.json(header);
            });
        });
}