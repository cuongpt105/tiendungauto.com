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
var DanhMucService = (function () {
    function DanhMucService(http) {
        this.http = http;
        this.danhmucUrl = app_setting_1.AppSettings.API_ENDPOINT + '/danhmuc';
    }
    DanhMucService.prototype.deleteDanhMuc = function (danhmucId) {
        var url = this.danhmucUrl + "/" + danhmucId;
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DanhMucService.prototype.getDanhMucs = function () {
        return this.http.get(this.danhmucUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DanhMucService.prototype.saveDanhMuc = function (danhmuc) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (danhmuc.id) {
            var url = this.danhmucUrl + "/" + danhmuc.id;
            return this.http
                .put(url, JSON.stringify(danhmuc), { headers: headers })
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
        else {
            return this.http
                .post(this.danhmucUrl, JSON.stringify(danhmuc), { headers: headers })
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
    };
    DanhMucService.prototype.compareDanhMuc = function (a, b) {
        if (a.level < b.level) {
            return -1;
        }
        if (a.level > b.level) {
            return 1;
        }
        if (a.position < b.position) {
            return -1;
        }
        if (a.position > b.position) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };
    DanhMucService.prototype.findDanhMucInList = function (danhmucs, dmId) {
        for (var _i = 0, danhmucs_1 = danhmucs; _i < danhmucs_1.length; _i++) {
            var dm = danhmucs_1[_i];
            if (dm.children.length > 0) {
                var danhmuc = this.findDanhMucInList(dm.children, dmId);
                if (danhmuc) {
                    return danhmuc;
                }
            }
            if (dm.id === dmId) {
                return dm;
            }
        }
    };
    DanhMucService.prototype.sortDanhMucs = function (danhmucs) {
        var _this = this;
        var dms = danhmucs.sort(this.compareDanhMuc);
        dms.forEach(function (dm) {
            if (dm.children.length > 0) {
                dm.children = _this.sortDanhMucs(dm.children);
            }
        });
        return dms;
    };
    DanhMucService.prototype.addDanhMucToRootList = function (danhmucs, danhmuc) {
        danhmucs.push(danhmuc);
        return danhmucs.sort(this.compareDanhMuc);
    };
    DanhMucService.prototype.addDanhMucToLevelInList = function (danhmucs, danhmuc) {
        var parent = this.findDanhMucInList(danhmucs, danhmuc.parentId);
        if (parent) {
            if (parent.children.length > 0) {
                parent.children.push(danhmuc);
            }
            else {
                parent.children = [];
                parent.children.push(danhmuc);
            }
            parent.children = parent.children.sort(this.compareDanhMuc);
            return danhmucs;
        }
        else {
            return this.addDanhMucToRootList(danhmucs, danhmuc);
        }
    };
    DanhMucService.prototype.updateSpecificDanhMucInList = function (danhmucs, danhmuc) {
        if (danhmuc.parentId) {
            var parent_1 = this.findDanhMucInList(danhmucs, danhmuc.parentId);
            if (parent_1) {
                if (parent_1.children.length > 0) {
                    var children = parent_1.children;
                    parent_1.children = this.spliceDanhMuc(children, danhmuc);
                }
                return danhmucs;
            }
        }
        // update danh muc at root of list
        return this.spliceDanhMuc(danhmucs, danhmuc);
    };
    DanhMucService.prototype.spliceDanhMuc = function (danhmucs, danhmuc) {
        var deleteCount = 1;
        var indexStart = danhmucs.findIndex(function (dm) { return dm.id === danhmuc.id; });
        if (indexStart >= 0) {
            danhmucs.splice(indexStart, deleteCount, danhmuc);
        }
        return danhmucs.sort(this.compareDanhMuc);
    };
    DanhMucService.prototype.handleError = function (error) {
        console.log('An error occurred at danh muc service:', error);
        return Rx_1.Observable.throw(error.message || error);
    };
    DanhMucService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DanhMucService);
    return DanhMucService;
}());
exports.DanhMucService = DanhMucService;
//# sourceMappingURL=danhmuc.service.js.map