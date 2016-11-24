var HandleException = require('../util/handleException');
var HeaderEntity = require('../entity/header.entity');

var handleException = new HandleException("HeaderDao");

class HeaderDao {
    constructor() {}

    findHeader(callback) {
        HeaderEntity.find({}).populate("file")
            .exec(function(err, headers){
                if (err) {
                    handleException.logMessageWithError("findHeader", "HeaderEntity.find({})", err);
                    callback(err);
                } else {
                    if (headers.length > 0) {
                        callback(err, headers[0]);
                    } else {
                        callback(err, new HeaderEntity());
                    }
                }
            });
    }
}

module.exports = new HeaderDao();