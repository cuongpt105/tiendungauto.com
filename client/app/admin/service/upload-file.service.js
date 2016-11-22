"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var UploadFileService = (function () {
    function UploadFileService() {
        this.percentUploaded = new Rx_1.Subject();
    }
    UploadFileService.prototype.uploadFile = function (url, files) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("file-upload", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                var process = Math.round(event.loaded / event.total * 100);
                var dataProcess = { key: url, data: process };
                _this.percentUploaded.next(dataProcess);
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    };
    UploadFileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UploadFileService);
    return UploadFileService;
}());
exports.UploadFileService = UploadFileService;
//# sourceMappingURL=upload-file.service.js.map