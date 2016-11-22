var HandleException = require('../util/handleException');

var HeaderEntity = require('../entity/header.entity');
var Header = require('../model/header.model');

var headerDao = require('../dao/header.dao');

var FileSystemService = require('../service/file-system.service');

var handleException = new HandleException("HeaderService");
var async = require('async');

module.exports = class HeaderService {
    constructor() {}

    findHeader(callback) {
        headerDao.findHeader(function(err, headerEntity) {
            if (err) {
                handleException.logMessageWithError("findHeader", "headerDao.findHeader", err);
                callback(err);
            } else {
                if (headerEntity) {
                    let headerModel = HeaderService.convertEntityToModel(headerEntity);
                    callback(err, headerModel);
                } else {
                    callback(err, new Header());
                }
            }
        });
    }

    static convertEntityToModel(headerEntity) {
        let file = FileSystemService.convertEntityToModel(headerEntity.file);
        let headerModel = new Header(headerEntity._id, file);
        return headerModel;
    }
}