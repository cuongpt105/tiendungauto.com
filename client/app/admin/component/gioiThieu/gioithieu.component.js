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
var gioithieu_1 = require('../../model/gioithieu');
var sidebar_item_broadcast_service_1 = require('../../service/sidebar-item-broadcast.service');
var sidebar_item_service_1 = require('../../service/sidebar-item.service');
var gioithieu_service_1 = require('../../service/gioithieu.service');
var GioiThieuComponent = (function () {
    function GioiThieuComponent(sidebarItemBroadcast, sidebarItemService, gioithieuService, _ngZone) {
        this.sidebarItemBroadcast = sidebarItemBroadcast;
        this.sidebarItemService = sidebarItemService;
        this.gioithieuService = gioithieuService;
        this._ngZone = _ngZone;
    }
    GioiThieuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentItem = this.sidebarItemService.getItemByName('gioithieu');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);
        this.gioithieu = new gioithieu_1.GioiThieu();
        this.files = [];
        this.filesToUpload = [];
        this.numberOfDataUpload = 0;
        this.gioithieuService.percentUploaded.subscribe(function (percent) {
            _this._ngZone.run(function () { return _this.numberOfDataUpload = percent; });
        });
        this.gioithieuService.getGioiThieu().subscribe(function (gioithieu) {
            if (gioithieu && gioithieu.id !== undefined) {
                _this.gioithieu = gioithieu;
                _this.files = gioithieu.files;
            }
            else {
                var gioithieu_2 = new gioithieu_1.GioiThieu();
                gioithieu_2.content = "Gioi Thieu";
                _this.gioithieuService.saveGioiThieu(gioithieu_2).subscribe(function (gioithieu) { return _this.gioithieu = gioithieu; });
            }
        });
    };
    GioiThieuComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        this.filesToUpload = [];
        this.filesToUpload = fileInput.target.files;
        this.gioithieuService.uploadLoadFile(this.filesToUpload).subscribe(function (files) {
            _this.files = files;
        });
    };
    GioiThieuComponent.prototype.deleteFile = function (file) {
        var _this = this;
        this.gioithieuService.deleteFile(this.gioithieu.id, file.id).subscribe(function (files) {
            _this.files = files;
        });
    };
    GioiThieuComponent.prototype.saveGioiThieu = function () {
        var _this = this;
        this.gioithieuService.saveGioiThieu(this.gioithieu).subscribe(function (gioithieu) {
            _this.gioithieu = gioithieu;
            _this.files = gioithieu.files;
        });
    };
    GioiThieuComponent.prototype.cancelGioiThieu = function () {
        var _this = this;
        this.gioithieuService.getGioiThieu().subscribe(function (gioithieu) {
            _this.gioithieu = gioithieu;
            _this.files = gioithieu.files;
        });
    };
    GioiThieuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gioi-thieu',
            templateUrl: "./gioithieu.component.html",
            styleUrls: ['./gioithieu.component.css', '../progress-bar.css']
        }), 
        __metadata('design:paramtypes', [sidebar_item_broadcast_service_1.SidebarItemBroadcast, sidebar_item_service_1.SideBarItemService, gioithieu_service_1.GioiThieuService, core_1.NgZone])
    ], GioiThieuComponent);
    return GioiThieuComponent;
}());
exports.GioiThieuComponent = GioiThieuComponent;
//# sourceMappingURL=gioithieu.component.js.map