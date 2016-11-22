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
var tintuc_1 = require('../../model/tintuc');
var sidebar_item_broadcast_service_1 = require('../../service/sidebar-item-broadcast.service');
var sidebar_item_service_1 = require('../../service/sidebar-item.service');
var tintucfile_service_1 = require('../../service/tintucfile.service');
var tintuc_service_1 = require('../../service/tintuc.service');
var TinTucComponent = (function () {
    function TinTucComponent(sidebarItemBroadcast, sideBarItemService, tintucfileService, tintucService, _ngZone) {
        this.sidebarItemBroadcast = sidebarItemBroadcast;
        this.sideBarItemService = sideBarItemService;
        this.tintucfileService = tintucfileService;
        this.tintucService = tintucService;
        this._ngZone = _ngZone;
    }
    TinTucComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentItem = this.sideBarItemService.getItemByName("tintuc");
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);
        this.filesToUpload = [];
        this.tintucfiles = [];
        this.tintucs = [];
        this.tintuc = null;
        this.numberOfDataUpload = 0;
        this.tintucfileService.percentUploaded.subscribe(function (percent) {
            _this._ngZone.run(function () { return _this.numberOfDataUpload = percent; });
        });
        this.tintucfileService.getTinTucFiles().subscribe(function (tintucfiles) { return _this.tintucfiles = tintucfiles; });
        this.tintucService.getTinTucs().subscribe(function (tintucs) {
            if (tintucs) {
                _this.tintucs = tintucs;
            }
        });
    };
    TinTucComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        this.filesToUpload = [];
        this.filesToUpload = fileInput.target.files;
        this.tintucfileService.uploadLoadFile(this.filesToUpload)
            .subscribe(function (tintucfiles) { return _this.tintucfiles = tintucfiles; });
    };
    TinTucComponent.prototype.deleteTinTucFile = function (tintucfile) {
        var _this = this;
        this.tintucfileService.deleteFile(tintucfile.id)
            .subscribe(function (tintucfiles) { return _this.tintucfiles = tintucfiles; });
    };
    TinTucComponent.prototype.cancelTinTuc = function () {
        this.tintuc = null;
    };
    TinTucComponent.prototype.saveTinTuc = function () {
        var _this = this;
        this.tintucService.saveTinTuc(this.tintuc).subscribe(function (tintuc) {
            _this.tintuc = null;
            _this.tintucService.getTinTucs().subscribe(function (tintucs) {
                _this.tintucs = tintucs;
            });
        });
    };
    TinTucComponent.prototype.addTinTuc = function () {
        this.tintuc = new tintuc_1.TinTuc();
    };
    TinTucComponent.prototype.editTinTuc = function (tintuc) {
        var _this = this;
        this.tintuc = JSON.parse(JSON.stringify(tintuc));
        var imageTitle = this.tintucfiles.filter(function (tt) { return _this.tintuc.imageTitle.id === tt.file.id; })[0].file;
        this.tintuc.imageTitle = imageTitle;
    };
    TinTucComponent.prototype.deleteTinTuc = function (tintuc) {
        var _this = this;
        this.tintucService.deleteTinTuc(tintuc.id).subscribe(function (tintucs) {
            _this.tintucs = tintucs;
        });
    };
    TinTucComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tin-tuc',
            templateUrl: "./tintuc.component.html",
            styleUrls: ['./tintuc.component.css']
        }), 
        __metadata('design:paramtypes', [sidebar_item_broadcast_service_1.SidebarItemBroadcast, sidebar_item_service_1.SideBarItemService, tintucfile_service_1.TinTucFileService, tintuc_service_1.TinTucService, core_1.NgZone])
    ], TinTucComponent);
    return TinTucComponent;
}());
exports.TinTucComponent = TinTucComponent;
//# sourceMappingURL=tintuc.component.js.map