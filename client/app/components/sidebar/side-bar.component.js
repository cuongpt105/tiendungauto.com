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
var danhmuc_service_1 = require('../../admin/service/danhmuc.service');
var danh_muc_broadcast_service_1 = require('../../broadcast/danh-muc-broadcast.service');
var SideBarComponent = (function () {
    function SideBarComponent(danhMucService, danhMucBroadcast) {
        this.danhMucService = danhMucService;
        this.danhMucBroadcast = danhMucBroadcast;
    }
    SideBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.danhMucList = [];
        this.danhMucService.getDanhMucs().subscribe(function (dms) {
            _this.danhmucs = dms;
            _this.danhMucList = _this.convertTreeToList();
            localStorage.setItem("danhmucs", JSON.stringify(_this.danhMucList));
            _this.danhMucBroadcast.broadCastValue(_this.danhMucList);
        });
    };
    SideBarComponent.prototype.onCategorySelected = function (danhmuc) {
        this.danhMucSelected = danhmuc;
    };
    SideBarComponent.prototype.convertTreeToList = function () {
        var danhmucList = [];
        for (var _i = 0, _a = this.danhmucs; _i < _a.length; _i++) {
            var dm = _a[_i];
            this.addChildrenToList(danhmucList, dm);
        }
        return danhmucList;
    };
    SideBarComponent.prototype.addChildrenToList = function (danhMucList, currentDanhMuc) {
        danhMucList.push(currentDanhMuc);
        if (currentDanhMuc.children && currentDanhMuc.children.length > 0) {
            for (var _i = 0, _a = currentDanhMuc.children; _i < _a.length; _i++) {
                var dm = _a[_i];
                this.addChildrenToList(danhMucList, dm);
            }
        }
    };
    SideBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'side-bar',
            templateUrl: './side-bar.component.html',
            styleUrls: ['./side-bar.component.css']
        }), 
        __metadata('design:paramtypes', [danhmuc_service_1.DanhMucService, danh_muc_broadcast_service_1.DanhMucBroadcast])
    ], SideBarComponent);
    return SideBarComponent;
}());
exports.SideBarComponent = SideBarComponent;
//# sourceMappingURL=side-bar.component.js.map