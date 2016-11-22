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
var dichvu_1 = require('../../model/dichvu');
var sidebar_item_broadcast_service_1 = require('../../service/sidebar-item-broadcast.service');
var sidebar_item_service_1 = require('../../service/sidebar-item.service');
var dichvu_service_1 = require('../../service/dichvu.service');
var DichVuComponent = (function () {
    function DichVuComponent(sidebarItemBroadcast, sidebarItemService, dichvuService, _ngZone) {
        this.sidebarItemBroadcast = sidebarItemBroadcast;
        this.sidebarItemService = sidebarItemService;
        this.dichvuService = dichvuService;
        this._ngZone = _ngZone;
    }
    DichVuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentItem = this.sidebarItemService.getItemByName('dichvu');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);
        this.dichvu = new dichvu_1.DichVu();
        this.fileSystems = [];
        this.filesToUpload = [];
        this.numberOfDataUpload = 0;
        this.dichvuService.percentUploaded.subscribe(function (percent) {
            _this._ngZone.run(function () { return _this.numberOfDataUpload = percent; });
        });
        this.dichvuService.getDichVu().subscribe(function (dichvu) {
            if (dichvu && dichvu.id !== undefined) {
                _this.dichvu = dichvu;
                _this.fileSystems = dichvu.files;
            }
            else {
                var dichvu_2 = new dichvu_1.DichVu();
                dichvu_2.content = "Dich Vu";
                _this.dichvuService.saveDichVu(dichvu_2).subscribe(function (dichvu) { return _this.dichvu = dichvu; });
            }
        });
    };
    DichVuComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        this.filesToUpload = [];
        this.filesToUpload = fileInput.target.files;
        this.dichvuService.uploadLoadFile(this.filesToUpload).subscribe(function (fileSystems) {
            _this.fileSystems = fileSystems;
        });
    };
    DichVuComponent.prototype.deleteFile = function (file) {
        var _this = this;
        this.dichvuService.deleteFile(this.dichvu.id, file.id).subscribe(function (fileSystems) {
            _this.fileSystems = fileSystems;
        });
    };
    DichVuComponent.prototype.saveDichVu = function () {
        var _this = this;
        this.dichvuService.saveDichVu(this.dichvu).subscribe(function (dichvu) {
            _this.dichvu = dichvu;
            _this.fileSystems = dichvu.files;
        });
    };
    DichVuComponent.prototype.cancelDichVu = function () {
        var _this = this;
        this.dichvuService.getDichVu().subscribe(function (dichvu) {
            _this.dichvu = dichvu;
            _this.fileSystems = dichvu.files;
        });
    };
    DichVuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dich-vu',
            templateUrl: "./dichvu.component.html",
            styleUrls: ['./dichvu.component.css', '../progress-bar.css']
        }), 
        __metadata('design:paramtypes', [sidebar_item_broadcast_service_1.SidebarItemBroadcast, sidebar_item_service_1.SideBarItemService, dichvu_service_1.DichVuService, core_1.NgZone])
    ], DichVuComponent);
    return DichVuComponent;
}());
exports.DichVuComponent = DichVuComponent;
//# sourceMappingURL=dichvu.component.js.map