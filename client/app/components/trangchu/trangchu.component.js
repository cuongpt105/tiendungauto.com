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
var menu_service_1 = require('../../services/menu.service');
var header_info_service_1 = require('../../services/header-info.service');
var information_common_handle_service_1 = require('../../services/information-common-handle.service');
var product_service_1 = require('../../admin/service/product.service');
var gallery_util_1 = require('../../util/gallery-util');
var TrangChuComponent = (function () {
    function TrangChuComponent(menuService, headerInfoService, informationCommonHandle, productService) {
        this.menuService = menuService;
        this.headerInfoService = headerInfoService;
        this.informationCommonHandle = informationCommonHandle;
        this.productService = productService;
        this.itemName = 'trangchu';
    }
    TrangChuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.products = [];
        this.galleries = [];
        this.updateInformationCommon();
        this.productService.getLatestProductsActiveBySpecifyField(12, "date desc")
            .subscribe(function (products) {
            _this.products = products;
        });
        // service to get gallery and convert this one to gallery on client
        this.galleries = gallery_util_1.GalleryUtil.convertToGalleryFromImageGallery();
    };
    TrangChuComponent.prototype.updateInformationCommon = function () {
        this.informationCommonHandle
            .init()
            .addMenuItem(this.menuService.getMenuItemByName(this.itemName))
            .addHeaderInfo(this.headerInfoService.getHeaderInfoByName(this.itemName))
            .addBreadCrumbs([])
            .fireUpdateData();
    };
    TrangChuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'trang-chu',
            templateUrl: './trangchu.component.html',
            styleUrls: ['./trangchu.component.css']
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, header_info_service_1.HeaderInfoService, information_common_handle_service_1.InformationCommonHandle, product_service_1.ProductService])
    ], TrangChuComponent);
    return TrangChuComponent;
}());
exports.TrangChuComponent = TrangChuComponent;
//# sourceMappingURL=trangchu.component.js.map