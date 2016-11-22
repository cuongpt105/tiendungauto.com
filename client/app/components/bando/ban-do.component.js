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
var platform_browser_1 = require('@angular/platform-browser');
var bread_crumb_info_1 = require('../../models/bread-crumb-info');
var menu_service_1 = require('../../services/menu.service');
var header_info_service_1 = require('../../services/header-info.service');
var information_common_handle_service_1 = require('../../services/information-common-handle.service');
var bando_service_1 = require('../../admin/service/bando.service');
var BanDoComponent = (function () {
    function BanDoComponent(menuService, headerInfoService, informationCommonHandle, banDoService, sanitizer) {
        this.menuService = menuService;
        this.headerInfoService = headerInfoService;
        this.informationCommonHandle = informationCommonHandle;
        this.banDoService = banDoService;
        this.sanitizer = sanitizer;
        this.itemName = 'bando';
    }
    BanDoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bandos = [];
        this.updateInformationCommon();
        this.banDoService.getBanDos().subscribe(function (bandos) { return _this.bandos = bandos; });
    };
    BanDoComponent.prototype.updateInformationCommon = function () {
        this.informationCommonHandle
            .init()
            .addMenuItem(this.menuService.getMenuItemByName(this.itemName))
            .addHeaderInfo(this.headerInfoService.getHeaderInfoByName(this.itemName))
            .addBreadCrumbs(this.getBreadCrumbs())
            .fireUpdateData();
    };
    BanDoComponent.prototype.getBreadCrumbs = function () {
        var bcs = [];
        var menuItem = this.menuService.getMenuItemByName(this.itemName);
        bcs.push(new bread_crumb_info_1.BreadCrumbInfo(menuItem.linkRef, menuItem.value));
        return bcs;
    };
    BanDoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ban-do',
            templateUrl: './ban-do.html',
            styleUrls: ['./ban-do.css']
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, header_info_service_1.HeaderInfoService, information_common_handle_service_1.InformationCommonHandle, bando_service_1.BanDoService, platform_browser_1.DomSanitizer])
    ], BanDoComponent);
    return BanDoComponent;
}());
exports.BanDoComponent = BanDoComponent;
//# sourceMappingURL=ban-do.component.js.map