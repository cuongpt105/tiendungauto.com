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
var information_common_handle_service_1 = require('../../services/information-common-handle.service');
var danh_muc_broadcast_service_1 = require('../../broadcast/danh-muc-broadcast.service');
var product_service_1 = require('../../admin/service/product.service');
var gallery_util_1 = require('../../util/gallery-util');
var DanhMucComponent = (function () {
    function DanhMucComponent(route, router, infoCommonHandle, danhMucBroadcast, productService) {
        this.route = route;
        this.router = router;
        this.infoCommonHandle = infoCommonHandle;
        this.danhMucBroadcast = danhMucBroadcast;
        this.productService = productService;
    }
    DanhMucComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.limit = 12;
        this.currentPage = 0;
        this.fieldOrderBy = "date desc";
        this.galleries = [];
        this.route.params.forEach(function (params) {
            _this.danhmucId = params['id'];
            _this.getProducts();
            _this.getGallery();
            if (_this.danhmucs && _this.danhmucs.length > 0) {
                _this.current = _this.danhmucs.filter(function (dm) { return dm.id === _this.danhmucId; })[0];
                _this.updateInformationCommon();
            }
            else {
                if (localStorage.getItem("danhmucs") != null) {
                    _this.danhmucs = JSON.parse(localStorage.getItem("danhmucs"));
                    _this.current = _this.danhmucs.filter(function (dm) { return dm.id === _this.danhmucId; })[0];
                    _this.updateInformationCommon();
                }
            }
        });
        this.danhMucBroadcast.triggerBroadcast().subscribe(function (dms) {
            _this.danhmucs = dms;
            _this.current = dms.filter(function (dm) { return dm.id === _this.danhmucId; })[0];
            _this.updateInformationCommon();
        });
    };
    DanhMucComponent.prototype.onSortChange = function (fieldOrderBy) {
        this.fieldOrderBy = fieldOrderBy;
        this.getProducts();
    };
    DanhMucComponent.prototype.onPageChange = function (nextPage) {
        this.currentPage = nextPage;
        this.getProducts();
    };
    DanhMucComponent.prototype.getGallery = function () {
        this.galleries = gallery_util_1.GalleryUtil.convertToGalleryFromImageGallery();
    };
    DanhMucComponent.prototype.getProducts = function () {
        var _this = this;
        this.productService.getProductsActiveByDanhMuc(this.danhmucId, this.limit, this.currentPage, this.fieldOrderBy)
            .subscribe(function (products) {
            _this.products = products;
        });
        this.productService.getTotalProductsActiveByDanhMuc(this.danhmucId)
            .subscribe(function (amountProduct) { return _this.totalProduct = amountProduct; });
    };
    DanhMucComponent.prototype.updateInformationCommon = function () {
        this.infoCommonHandle
            .init()
            .addMenuItem(new menu_item_1.MenuItem("", "", ""))
            .addHeaderInfo(this.getHeaderInfo())
            .addBreadCrumbs(this.getBreadCrumbInfo())
            .fireUpdateData();
    };
    DanhMucComponent.prototype.getHeaderInfo = function () {
        var title = "" + this.current.seoTitle;
        var keyword = "" + this.current.seoKeyword;
        var description = "" + this.current.seoDescription;
        var headerInfo = new header_info_1.HeaderInfo("", title, keyword, description);
        return headerInfo;
    };
    DanhMucComponent.prototype.getBreadCrumbInfo = function () {
        var dms = this.getDanhMucsRelation(this.current);
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
            var link = "/danhmuc/" + dm.id;
            var value = "" + dm.name;
            var breadcrumb = new bread_crumb_info_1.BreadCrumbInfo(link, value);
            breadcrumbs.push(breadcrumb);
        }
        return breadcrumbs;
    };
    DanhMucComponent.prototype.getDanhMucsRelation = function (danhMuc) {
        var result = [danhMuc];
        var dmTemp = danhMuc;
        var isValid = true;
        while (isValid) {
            if (dmTemp.parentId) {
                var filters = this.danhmucs.filter(function (dm) { return dm.id === dmTemp.parentId; });
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
    DanhMucComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'danh-muc',
            templateUrl: './danh-muc.component.html',
            styleUrls: ['./danh-muc.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, information_common_handle_service_1.InformationCommonHandle, danh_muc_broadcast_service_1.DanhMucBroadcast, product_service_1.ProductService])
    ], DanhMucComponent);
    return DanhMucComponent;
}());
exports.DanhMucComponent = DanhMucComponent;
//# sourceMappingURL=danh-muc.component.js.map