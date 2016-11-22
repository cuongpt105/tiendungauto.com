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
var app_setting_1 = require('../../util/app-setting');
var TinTucService = (function () {
    function TinTucService(http) {
        this.http = http;
        this.tintucUrl = app_setting_1.AppSettings.API_ENDPOINT + '/tintuc';
    }
    TinTucService.prototype.deleteTinTuc = function (tintucId) {
        var url = this.tintucUrl + "/" + tintucId;
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TinTucService.prototype.getTinTucs = function () {
        return this.http.get(this.tintucUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TinTucService.prototype.saveTinTuc = function (tintuc) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (tintuc.id) {
            var url = this.tintucUrl + "/" + tintuc.id;
            return this.http
                .put(url, JSON.stringify(tintuc), { headers: headers })
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
        else {
            return this.http
                .post(this.tintucUrl, JSON.stringify(tintuc), { headers: headers })
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
    };
    TinTucService.prototype.handleError = function (error) {
        console.log('An error occurred at tin tuc service:', error);
        return Rx_1.Observable.throw(error.message || error);
    };
    TinTucService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TinTucService);
    return TinTucService;
}());
exports.TinTucService = TinTucService;
//# sourceMappingURL=tintuc.service.js.map