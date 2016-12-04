"use strict";
var applicationConstant = require('./application-constant.js');

var multer = require("multer");
var path = require('path');

module.exports = () => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "."+applicationConstant.PATH_STORE_FILE)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
        
    return multer({ storage: storage });
};