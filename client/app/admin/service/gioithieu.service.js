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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var upload_file_service_1 = require('./upload-file.service');
var app_setting_1 = require('../../util/app-setting');
var GioiThieuService = (function () {
    function GioiThieuService(uploadFileService, http) {
        this.uploadFileService = uploadFileService;
        this.http = http;
        this.gioithieuUrl = app_setting_1.AppSettings.API_ENDPOINT + '/gioithieu';
        this.gioithieuFileUrl = app_setting_1.AppSettings.API_ENDPOINT + '/gioithieu/files';
        this.percentUploaded = new Rx_1.Subject();
    }
    GioiThieuService.prototype.uploadLoadFile = function (files) {
        var _this = this;
        this.uploadFileService.percentUploaded.subscribe(function (data) {
            if (data.key === _this.gioithieuFileUrl) {
                _this.percentUploaded.next(data.data);
            }
        });
        return this.uploadFileService.uploadFile(this.gioithieuFileUrl, files);
    };
    GioiThieuService.prototype.deleteFile = function (gioithieuId, fileId) {
        var url = this.gioithieuUrl + "/" + gioithieuId + "/files/" + fileId;
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GioiThieuService.prototype.getGioiThieu = function () {
        return this.http.get(this.gioithieuUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GioiThieuService.prototype.saveGioiThieu = function (gioithieu) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.gioithieuUrl, JSON.stringify(gioithieu), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GioiThieuService.prototype.handleError = function (error) {
        console.log('An error occurred at gioi thieu service:', error);
        return Rx_1.Observable.throw(error.message || error);
    };
    GioiThieuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [upload_file_service_1.UploadFileService, http_1.Http])
    ], GioiThieuService);
    return GioiThieuService;
}());
exports.GioiThieuService = GioiThieuService;
//# sourceMappingURL=gioithieu.service.js.map