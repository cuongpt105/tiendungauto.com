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
var BanDoService = (function () {
    function BanDoService(http) {
        this.http = http;
        this.bandoUrl = app_setting_1.AppSettings.API_ENDPOINT + '/bando';
    }
    BanDoService.prototype.getBanDos = function () {
        return this.http.get(this.bandoUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BanDoService.prototype.deleteBanDo = function (bandoId) {
        var url = this.bandoUrl + "/" + bandoId;
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BanDoService.prototype.saveBanDo = function (bando) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (bando.id) {
            var url = this.bandoUrl + "/" + bando.id;
            return this.http
                .put(url, JSON.stringify(bando), { headers: headers })
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
        else {
            return this.http
                .post(this.bandoUrl, JSON.stringify(bando), { headers: headers })
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
    };
    BanDoService.prototype.handleError = function (error) {
        console.log('An error occurred at tin tuc service:', error);
        return Rx_1.Observable.throw(error.message || error);
    };
    BanDoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BanDoService);
    return BanDoService;
}());
exports.BanDoService = BanDoService;
//# sourceMappingURL=bando.service.js.map