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
var router_1 = require('@angular/router');
var header_info_1 = require('../../models/header-info');
var menu_item_1 = require('../../models/menu-item');
var bread_crumb_info_1 = require('../../models/bread-crumb-info');
var product_1 = require('../../admin/model/product');
var information_common_handle_service_1 = require('../../services/information-common-handle.service');
var danh_muc_broadcast_service_1 = require('../../broadcast/danh-muc-broadcast.service');
var product_service_1 = require('../../admin/service/product.service');
var gallery_util_1 = require('../../util/gallery-util');
var ProductComponent = (function () {
    function ProductComponent(route, productService, infoCommonHandle, danhMucBroadcast) {
        this.route = route;
        this.productService = productService;
        this.infoCommonHandle = infoCommonHandle;
        this.danhMucBroadcast = danhMucBroadcast;
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productRating = 4;
        this.product = new product_1.Product();
        this.quantityInformation = "";
        this.galleries = [];
        this.route.params.forEach(function (params) {
            _this.productId = params['id'];
            _this.productService.getProductById(_this.productId)
                .subscribe(function (product) {
                _this.product = product;
                _this.galleries = gallery_util_1.GalleryUtil.convertToGalleryFromProduct(product);
                _this.updateInformationCommon();
            });
        });
    };
    ProductComponent.prototype.addToCart = function () {
    };
    ProductComponent.prototype.onChangeRating = function (ratingValue) {
    };
    ProductComponent.prototype.updateInformationCommon = function () {
        this.infoCommonHandle
            .init()
            .addMenuItem(new menu_item_1.MenuItem("", "", ""))
            .addHeaderInfo(this.getHeaderInfo())
            .addBreadCrumbs(this.getBreadCrumbInfo())
            .fireUpdateData();
    };
    ProductComponent.prototype.getHeaderInfo = function () {
        var title = "" + this.product.seoTitle;
        var keyword = "" + this.product.seoKeyword;
        var description = "" + this.product.seoDescription;
        var headerInfo = new header_info_1.HeaderInfo("", title, keyword, description);
        return headerInfo;
    };
    ProductComponent.prototype.getBreadCrumbInfo = function () {
        var dms = this.getDanhMucsRelation(this.product.danhmuc);
        dms = dms.sort(function (a, b) {
            if (a.level < b.level)
                return -1;
            if (a.level > b.level)
                return 1;
            return 0;
        });
        var breadcrumbs = [];
        for (var _i = 0, dms_1 = dms; _i < dms_1.length; _i++) {
            var dm = dms_1[_i];
            var link_1 = "/danh-muc/" + dm.id;
            var value_1 = "" + dm.name;
            var breadcrumb_1 = new bread_crumb_info_1.BreadCrumbInfo(link_1, value_1);
            breadcrumbs.push(breadcrumb_1);
        }
        var link = "/san-pham/" + this.product.id;
        var value = "" + this.product.name;
        var breadcrumb = new bread_crumb_info_1.BreadCrumbInfo(link, value);
        breadcrumbs.push(breadcrumb);
        return breadcrumbs;
    };
    ProductComponent.prototype.getDanhMucsRelation = function (danhMuc) {
        var result = [danhMuc];
        var danhMucsFromStorage = [];
        var isValid = true;
        while (isValid) {
            if (localStorage.getItem("danhmucs") != null) {
                danhMucsFromStorage = JSON.parse(localStorage.getItem("danhmucs"));
                isValid = false;
            }
        }
        var dmTemp = danhMuc;
        isValid = true;
        while (isValid) {
            if (dmTemp.parentId) {
                var filters = danhMucsFromStorage.filter(function (dm) { return dm.id === dmTemp.parentId; });
                if (filters && filters.length > 0) {
                    result.push(filters[0]);
                    dmTemp = filters[0];
                }
                else {
                    isValid = false;
                }
            }
            else {
                isValid = false;
            }
        }
        return result;
    };
    ProductComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'product',
            templateUrl: './product.html',
            styleUrls: ['./product.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, product_service_1.ProductService, information_common_handle_service_1.InformationCommonHandle, danh_muc_broadcast_service_1.DanhMucBroadcast])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map