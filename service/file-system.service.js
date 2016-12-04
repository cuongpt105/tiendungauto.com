var HandleException = require('../util/handleException');
var applicationConstant = require('../util/application-constant.js');
var fs = require('fs');

var FileSystemEntity = require('../entity/file-system.entity');
var FileSystem = require('../model/file-system.model');

var fileSystemDao = require('../dao/file-system.dao');

var handleException = new HandleException("FileSystemService");


module.exports = class FileSystemService {
    constructor() {}

    saveFileSystem(file, callback) {
        let fileSystemEntity = new FileSystemEntity();
        fileSystemEntity.fileName = file.filename;
        fileSystemEntity.originalName = file.originalname;
        fileSystemEntity.size = file.size;

        tintuc.save(function(err, entity){
            if (err) {
                handleException.logMessageWithError("saveFileSystem", "tintuc.save", err);
                callback(err);    
            }

            let model = FileSystemService.convertEntityToModel(entity);
            callback(err, model);
        });
    }

    saveFileSystems(files, callback) {
        let fileSystemEntities = [];
        for (let file of files) {
            let fileSystemEntity = new FileSystemEntity();
            fileSystemEntity.fileName = file.filename;
            fileSystemEntity.originalName = file.originalname;
            fileSystemEntity.size = file.size;
            fileSystemEntities.push(fileSystemEntity);
        }

        FileSystemEntity.insertMany(fileSystemEntities, function(err, fileEntities){
            if (err) {
                handleException.logMessageWithError("saveFileSystems", "FileSystemEntity.insertMany", err);
                callback(err);
            }

            let resultModels = FileSystemService.convertEntitiesToModels(fileEntities);
            callback(err, resultModels);
        })
    }

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
                    let message = "Lỗi trong quá trình get file. File này không tồn tại trong hệ thống. ";
                    message = message + "Làm ơn thông báo lỗi này tới người quản trị."
                    handleException.logMessageWithError("findFileSystemById", "fileSystemDao.findFileSystemById", message);
                    callback(new Error(message));
                }
            }
        });
    } 

    deleteFileSystemById(fileId, callback) {
        fileSystemDao.findFileSystemById(fileId, function(err, fileSystemEntity){
            if (err) {
                handleException.logMessageWithError("deleteFileSystemById", "fileSystemDao.findFileSystemById", err);
                callback(err);
            } else {
                if (fileSystemEntity) {
                    FileSystemEntity.remove({_id:fileId}, function(err){
                        if (err) {
                            handleException.logMessageWithError("deleteFileSystemById", "FileSystemEntity.remove", err);
                            callback(err);
                        }

                        let pathStoreFile = './'+applicationConstant.PATH_STORE_FILE + '/' + fileSystemEntity.fileName;
                        fs.access(pathStoreFile, fs.F_OK, function(err) {
                            if (!err) {
                                fs.unlink(pathStoreFile);
                            } else {
                                handleException.logMessageWithError("deleteFileSystemById", fs.access, err);
                            }
                        });
                        callback(err, true);
                    });
                } else {
                    let message = "Error trong quá trình xóa file. File này không tồn tại trong hệ thống. ";
                    message = message + "Làm ơn thông báo lỗi này tới ngườ quản trị hệ thống."
                    callback(new Error(message));
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