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
var thanhtoan_1 = require('../../model/thanhtoan');
var sidebar_item_broadcast_service_1 = require('../../service/sidebar-item-broadcast.service');
var sidebar_item_service_1 = require('../../service/sidebar-item.service');
var thanhtoan_service_1 = require('../../service/thanhtoan.service');
var ThanhToanComponent = (function () {
    function ThanhToanComponent(sidebarItemBroadcast, sidebarItemService, thanhtoanService, _ngZone) {
        this.sidebarItemBroadcast = sidebarItemBroadcast;
        this.sidebarItemService = sidebarItemService;
        this.thanhtoanService = thanhtoanService;
        this._ngZone = _ngZone;
    }
    ThanhToanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentItem = this.sidebarItemService.getItemByName('thanhtoan');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);
        this.thanhtoan = new thanhtoan_1.ThanhToan();
        this.fileSystems = [];
        this.filesToUpload = [];
        this.numberOfDataUpload = 0;
        this.thanhtoanService.percentUploaded.subscribe(function (percent) {
            _this._ngZone.run(function () { return _this.numberOfDataUpload = percent; });
        });
        this.thanhtoanService.getThanhToan().subscribe(function (thanhtoan) {
            if (thanhtoan && thanhtoan.id) {
                _this.thanhtoan = thanhtoan;
                _this.fileSystems = thanhtoan.files;
            }
            else {
                var thanhtoan_2 = new thanhtoan_1.ThanhToan();
                thanhtoan_2.content = "Thanh Toan";
                _this.thanhtoanService.saveThanhToan(thanhtoan_2).subscribe(function (result) {
                    _this.thanhtoan = result;
                });
            }
        });
    };
    ThanhToanComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        this.filesToUpload = [];
        this.filesToUpload = fileInput.target.files;
        this.thanhtoanService.uploadLoadFile(this.filesToUpload).subscribe(function (fileSystems) {
            _this.fileSystems = fileSystems;
        });
    };
    ThanhToanComponent.prototype.deleteFile = function (file) {
        var _this = this;
        this.thanhtoanService.deleteFile(this.thanhtoan.id, file.id).subscribe(function (fileSystems) {
            _this.fileSystems = fileSystems;
        });
    };
    ThanhToanComponent.prototype.saveThanhToan = function () {
        var _this = this;
        this.thanhtoanService.saveThanhToan(this.thanhtoan).subscribe(function (thanhtoan) {
            _this.thanhtoan = thanhtoan;
            _this.fileSystems = thanhtoan.files;
        });
    };
    ThanhToanComponent.prototype.cancelThanhToan = function () {
        var _this = this;
        this.thanhtoanService.getThanhToan().subscribe(function (thanhtoan) {
            _this.thanhtoan = thanhtoan;
            _this.fileSystems = thanhtoan.files;
        });
    };
    ThanhToanComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thanh-toan',
            templateUrl: "./thanhtoan.component.html",
            styleUrls: ['./thanhtoan.component.css', '../progress-bar.css']
        }), 
        __metadata('design:paramtypes', [sidebar_item_broadcast_service_1.SidebarItemBroadcast, sidebar_item_service_1.SideBarItemService, thanhtoan_service_1.ThanhToanService, core_1.NgZone])
    ], ThanhToanComponent);
    return ThanhToanComponent;
}());
exports.ThanhToanComponent = ThanhToanComponent;
//# sourceMappingURL=thanhtoan.component.js.map