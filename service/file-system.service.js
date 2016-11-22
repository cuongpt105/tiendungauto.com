var HandleException = require('../util/handleException');

var FileSystemEntity = require('../entity/file-system.entity');
var FileSystem = require('../model/file-system.model');

var fileSystemDao = require('../dao/file-system.dao');

var handleException = new HandleException("FileSystemService");

module.exports = class FileSystemService {
    constructor() {}

    findFileSystemById(fileId, callback) {
        fileSystemDao.findFileSystemById(fileId, function(err, fileSystemEntity){
            if (err) {
                handleException.logMessageWithError("findFileSystemById", "fileSystemDao.findFileSystemById", err);
                callback(err);
            } else {
                if (fileSystemEntity) {
                    let fileSystem = FileSystemService.convertEntityToModel(fileSystemEntity);
                    callback(err, fileSystem);
                } else {
                    callback(new Error("File nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin"));
                }
            }
        });
    } 

    static convertEntityToModel(fileSystemEntity) {
        if (fileSystemEntity) {
            let fileSystem = new FileSystem(fileSystemEntity._id, 
                fileSystemEntity.fileName, fileSystemEntity.originalName,
                fileSystemEntity.size, "files/"+fileSystemEntity.fileName);
            return fileSystem;
        } else {
            return new FileSystem();
        }
        
    } 

    static convertEntitiesToModels(fileSystemEntities) {
        let files = [];
        for (let entity of fileSystemEntities) {
            files.push(FileSystemService.convertEntityToModel(entity));
        }

        return files;
    }
}