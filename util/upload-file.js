"use strict";
var multer = require("multer");
var path = require('path');

module.exports = () => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './web_src/src/files/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
        
    return multer({ storage: storage });
};