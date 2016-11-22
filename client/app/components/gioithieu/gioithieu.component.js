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
var bread_crumb_info_1 = require('../../models/bread-crumb-info');
var gioithieu_1 = require('../../admin/model/gioithieu');
var menu_service_1 = require('../../services/menu.service');
var header_info_service_1 = require('../../services/header-info.service');
var information_common_handle_service_1 = require('../../services/information-common-handle.service');
var gioithieu_service_1 = require('../../admin/service/gioithieu.service');
var GioiThieuComponent = (function () {
    function GioiThieuComponent(menuService, headerInfoService, informationCommonHandle, gioiThieuService) {
        this.menuService = menuService;
        this.headerInfoService = headerInfoService;
        this.informationCommonHandle = informationCommonHandle;
        this.gioiThieuService = gioiThieuService;
        this.itemName = 'gioithieu';
    }
    GioiThieuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gioiThieu = new gioithieu_1.GioiThieu();
        this.updateInformationCommon();
        this.gioiThieuService.getGioiThieu().subscribe(function (gioithieu) { return _this.gioiThieu = gioithieu; });
    };
    GioiThieuComponent.prototype.updateInformationCommon = function () {
        this.informationCommonHandle
            .init()
            .addMenuItem(this.menuService.getMenuItemByName(this.itemName))
            .addHeaderInfo(this.headerInfoService.getHeaderInfoByName(this.itemName))
            .addBreadCrumbs(this.getBreadCrumbs())
            .fireUpdateData();
    };
    GioiThieuComponent.prototype.getBreadCrumbs = function () {
        var bcs = [];
        var menuItem = this.menuService.getMenuItemByName(this.itemName);
        bcs.push(new bread_crumb_info_1.BreadCrumbInfo(menuItem.linkRef, menuItem.value));
        return bcs;
    };
    GioiThieuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gioi-thieu',
            templateUrl: './gioithieu.component.html',
            styleUrls: ['./gioithieu.component.css']
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, header_info_service_1.HeaderInfoService, information_common_handle_service_1.InformationCommonHandle, gioithieu_service_1.GioiThieuService])
    ], GioiThieuComponent);
    return GioiThieuComponent;
}());
exports.GioiThieuComponent = GioiThieuComponent;
//# sourceMappingURL=gioithieu.component.js.map