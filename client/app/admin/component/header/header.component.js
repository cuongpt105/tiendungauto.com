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
var sidebar_item_broadcast_service_1 = require('../../service/sidebar-item-broadcast.service');
var sidebar_item_service_1 = require('../../service/sidebar-item.service');
var header_service_1 = require('../../service/header.service');
var HeaderComponent = (function () {
    function HeaderComponent(sidebarItemBroadcast, sidebarItemService, headerService, _ngZone) {
        this.sidebarItemBroadcast = sidebarItemBroadcast;
        this.sidebarItemService = sidebarItemService;
        this.headerService = headerService;
        this._ngZone = _ngZone;
    }
    ;
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentItem = this.sidebarItemService.getItemByName('header');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);
        this.filesToUpload = [];
        this.numberOfDataUpload = 0;
        this.headerService.percentUploaded.subscribe(function (percent) {
            _this._ngZone.run(function () { return _this.numberOfDataUpload = percent; });
        });
        this.headerService.getHeader().subscribe(function (header) { return _this.header = header; });
    };
    HeaderComponent.prototype.upload = function () {
        var _this = this;
        this.headerService.uploadHeader(this.filesToUpload).subscribe(function (header) {
            _this.header = header;
        });
    };
    HeaderComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
    };
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'header',
            templateUrl: "./header.component.html",
            styleUrls: ['./header.component.css', '../progress-bar.css']
        }), 
        __metadata('design:paramtypes', [sidebar_item_broadcast_service_1.SidebarItemBroadcast, sidebar_item_service_1.SideBarItemService, header_service_1.HeaderService, core_1.NgZone])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map