//var HandleException = require('../util/HandleException');

var FileSystemEntity = require('../entity/file-system.entity');

//var handleException = new HandleException("FileSystemDao");

class FileSystemDao {
    constructor() {}
    save(file) {
        let fileSystemEntity = new FileSystemEntity();
        fileSystemEntity.fileName = file.filename;
        fileSystemEntity.originalName = file.originalname;
        fileSystemEntity.size = file.size;

        fileSystemEntity.save(function(err){
            if (err) {
                //handleException.logMessageWithError("save", "fileSystemEntity.save", err);
                throw err;
            }
        });

        return fileSystemEntity;
    }

    saveFileWithCallback(file, callback) {
        let fileSystemEntity = new FileSystemEntity();
        fileSystemEntity.fileName = file.filename;
        fileSystemEntity.originalName = file.originalname;
        fileSystemEntity.size = file.size;

        fileSystemEntity.save(function(err, fileEntity){
            if (err) {
                //handleException.logMessageWithError("save", "fileSystemEntity.save", err);
                callback(err);
            } else {
                callback(err, fileSystemEntity);
            }
        });
    }

    saveFiles(files, callback) {
        let fileSystems = [];
        for (let file of files) {
            let fileSystemEntity = new FileSystemEntity();
            fileSystemEntity.fileName = file.filename;
            fileSystemEntity.originalName = file.originalname;
            fileSystemEntity.size = file.size;
            fileSystems.push(fileSystemEntity);
        }

        FileSystemEntity.insertMany(fileSystems, function(err, results){
            if (err) {
                //handleException.logMessageWithError("saveFiles", "FileSystemEntity.insertMany", err);
            }

            callback(err, results);
        })
    }

    findFileSystemById(fileId, callback) {
        FileSystemEntity.findById(fileId,function(err, fileSystemEntity){
            if (err) {
                //handleException.logMessageWithError("findFileSystemById", "FileSystemEntity.findById", err);
                throw err;
            }

            callback(err,fileSystemEntity);
        });
    }

    deleteFileSystemById(fileId) {
        FileSystemEntity.findByIdAndRemove(fileId, function(err){
            if (err) {
                //handleException.logMessageWithError("deleteFileSystemById", "FileSystemEntity.findByIdAndRemove", err);
                throw err;
            }
        });
    }
}

module.exports = new FileSystemDao();
 