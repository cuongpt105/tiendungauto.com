"use strict";

var logger = require('../util/logger');

module.exports = class HandleException {
    constructor(className){
        this.className = className;
    }

    logMessageWithError(methodName, message, err) {
        let fullMessage = this.className + ":" + methodName + ": Message:"+ message + "; StactTrace:" + err;
        logger.error(fullMessage);
    }

    logMessageWithoutError(methodName, message) {
        let fullMessage = this.className + ":" + methodName + ": Message:"+ message + "; StactTrace:" + err;
        logger.error(fullMessage);
    }
}