var HandleException = require('../util/handleException');

var uploadFile = require('../util/upload-file');

var fileSystemDao = require('../dao/file-system.dao');

var FileSystemService = require('../service/file-system.service')

module.exports = (app, router) => {
    let handleException = new HandleException("FileSystemRouter");
    let fileSystemService = new FileSystemService();

    router.route("/files")
        .post(uploadFile().array("file-upload", 12), function(req, res){
            fileSystemService.saveFileSystems(req.files, function(err, fileSystemModels){
                if (err) {
                    handleException.logMessageWithError("POST /files", "fileSystemService.saveFileSystems", err);
                    res.status(500).send(err);    
                }

                res.json(fileSystemModels);
            });
        });

    router.route("/files/:file_id")
        .delete(function(req, res){
            fileSystemService.deleteFileSystemById(req.params.file_id, function(err, result){
                if (err) {
                    handleException.logMessageWithError("DELETE /files/:file_id", "fileSystemService.deleteFileSystemById", err);
                    res.status(500).send(err);    
                }

                res.json(result);
            });
		})

        .get(function(req, res){
            fileSystemService.findFileSystemById(req.params.file_id, function(err, file){
                if (err) {
                    handleException.logMessageWithError("GET /files/:file_id", "fileSystemService.findFileSystemById", err);
                    res.status(500).send(err);    
                }
                res.json(file);
            });
        });
}