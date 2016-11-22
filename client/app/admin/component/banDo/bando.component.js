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
var bando_1 = require('../../model/bando');
var sidebar_item_broadcast_service_1 = require('../../service/sidebar-item-broadcast.service');
var sidebar_item_service_1 = require('../../service/sidebar-item.service');
var bando_service_1 = require('../../service/bando.service');
var BanDoComponent = (function () {
    function BanDoComponent(sidebarItemBroadcast, sideBarItemService, bandoService) {
        this.sidebarItemBroadcast = sidebarItemBroadcast;
        this.sideBarItemService = sideBarItemService;
        this.bandoService = bandoService;
    }
    BanDoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bando = null;
        this.bandos = [];
        this.currentItem = this.sideBarItemService.getItemByName("bando");
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);
        this.bandoService.getBanDos().subscribe(function (bandos) {
            _this.bandos = bandos;
        });
    };
    BanDoComponent.prototype.addBanDo = function () {
        this.bando = new bando_1.BanDo();
    };
    BanDoComponent.prototype.editBanDo = function (bando) {
        this.bando = JSON.parse(JSON.stringify(bando));
    };
    BanDoComponent.prototype.deleteBanDo = function (bando) {
        var _this = this;
        this.bandoService.deleteBanDo(bando.id).subscribe(function (bandos) {
            _this.bandos = bandos;
        });
    };
    BanDoComponent.prototype.saveBanDo = function () {
        var _this = this;
        this.bandoService.saveBanDo(this.bando).subscribe(function (bando) {
            _this.bandoService.getBanDos().subscribe(function (bandos) {
                _this.bandos = bandos;
                _this.bando = null;
            });
        });
    };
    BanDoComponent.prototype.cancelBanDo = function () {
        this.bando = null;
    };
    BanDoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ban-do',
            templateUrl: "./bando.component.html",
            styleUrls: ['./bando.component.css']
        }), 
        __metadata('design:paramtypes', [sidebar_item_broadcast_service_1.SidebarItemBroadcast, sidebar_item_service_1.SideBarItemService, bando_service_1.BanDoService])
    ], BanDoComponent);
    return BanDoComponent;
}());
exports.BanDoComponent = BanDoComponent;
//# sourceMappingURL=bando.component.js.map