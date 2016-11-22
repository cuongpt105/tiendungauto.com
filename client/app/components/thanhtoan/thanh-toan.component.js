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
var thanhtoan_1 = require('../../admin/model/thanhtoan');
var menu_service_1 = require('../../services/menu.service');
var header_info_service_1 = require('../../services/header-info.service');
var information_common_handle_service_1 = require('../../services/information-common-handle.service');
var thanhtoan_service_1 = require('../../admin/service/thanhtoan.service');
var ThanhToanComponent = (function () {
    function ThanhToanComponent(menuService, headerInfoService, informationCommonHandle, thanhToanService) {
        this.menuService = menuService;
        this.headerInfoService = headerInfoService;
        this.informationCommonHandle = informationCommonHandle;
        this.thanhToanService = thanhToanService;
        this.itemName = 'thanhtoan';
    }
    ThanhToanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.thanhToan = new thanhtoan_1.ThanhToan();
        this.updateInformationCommon();
        this.thanhToanService.getThanhToan().subscribe(function (thanhToan) { return _this.thanhToan = thanhToan; });
    };
    ThanhToanComponent.prototype.updateInformationCommon = function () {
        this.informationCommonHandle
            .init()
            .addMenuItem(this.menuService.getMenuItemByName(this.itemName))
            .addHeaderInfo(this.headerInfoService.getHeaderInfoByName(this.itemName))
            .addBreadCrumbs(this.getBreadCrumbs())
            .fireUpdateData();
    };
    ThanhToanComponent.prototype.getBreadCrumbs = function () {
        var bcs = [];
        var menuItem = this.menuService.getMenuItemByName(this.itemName);
        bcs.push(new bread_crumb_info_1.BreadCrumbInfo(menuItem.linkRef, menuItem.value));
        return bcs;
    };
    ThanhToanComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thanh-toan',
            templateUrl: './thanh-toan.html',
            styleUrls: ['./thanh-toan.css']
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, header_info_service_1.HeaderInfoService, information_common_handle_service_1.InformationCommonHandle, thanhtoan_service_1.ThanhToanService])
    ], ThanhToanComponent);
    return ThanhToanComponent;
}());
exports.ThanhToanComponent = ThanhToanComponent;
//# sourceMappingURL=thanh-toan.component.js.map