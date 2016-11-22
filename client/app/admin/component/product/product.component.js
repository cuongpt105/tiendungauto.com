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
var product_1 = require('../../model/product');
var sidebar_item_broadcast_service_1 = require('../../service/sidebar-item-broadcast.service');
var sidebar_item_service_1 = require('../../service/sidebar-item.service');
var product_service_1 = require('../../service/product.service');
var danhmuc_service_1 = require('../../service/danhmuc.service');
var ProductComponent = (function () {
    function ProductComponent(sidebarItemBroadcast, sidebarItemService, danhmucService, productService) {
        this.sidebarItemBroadcast = sidebarItemBroadcast;
        this.sidebarItemService = sidebarItemService;
        this.danhmucService = danhmucService;
        this.productService = productService;
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentItem = this.sidebarItemService.getItemByName('sanpham');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);
        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
        this.allowCreate = false;
        this.danhmucs = [];
        this.products = [];
        this.danhmucService.getDanhMucs().subscribe(function (dms) {
            _this.danhmucs = dms;
        });
    };
    ProductComponent.prototype.selectDanhMuc = function (danhmuc) {
        var _this = this;
        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
        this.allowCreate = false;
        var hasChildren = danhmuc.children && danhmuc.children.length > 0;
        if (!hasChildren) {
            this.allowCreate = true;
            this.danhmucSelection = danhmuc;
            this.productService.getProducts(danhmuc.id).subscribe(function (products) { return _this.products = products; });
        }
        else {
        }
    };
    ProductComponent.prototype.addProduct = function () {
        this.isView = false;
        this.isCreate = true;
        this.isHideList = true;
        this.product = new product_1.Product();
        this.product.danhmuc = this.danhmucSelection;
    };
    ProductComponent.prototype.saveProduct = function (product) {
        var _this = this;
        this.productService.saveProduct(product).subscribe(function (pd) {
            if (_this.isCreate) {
                _this.products = _this.productService.addProductInList(_this.products, pd);
            }
            else {
                _this.products = _this.productService.updateProductInList(_this.products, pd);
            }
            _this.isView = false;
            _this.isCreate = false;
            _this.isHideList = false;
        });
    };
    ProductComponent.prototype.cancelProduct = function (product) {
        this.product = null;
        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
    };
    ProductComponent.prototype.backProducts = function (product) {
        this.product = null;
        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
    };
    ProductComponent.prototype.viewProduct = function (product) {
        this.isView = true;
        this.isCreate = false;
        this.isHideList = true;
        this.product = product;
    };
    ProductComponent.prototype.editProduct = function (product) {
        this.isView = false;
        this.isCreate = false;
        this.isHideList = true;
        this.product = Object.assign(product);
    };
    ProductComponent.prototype.deleteProduct = function (product) {
        var _this = this;
        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
        this.productService.deleteProduct(product.id).subscribe(function (products) { return _this.products = products; });
    };
    ProductComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'product',
            templateUrl: "./product.component.html",
            styleUrls: ['./product.component.css']
        }), 
        __metadata('design:paramtypes', [sidebar_item_broadcast_service_1.SidebarItemBroadcast, sidebar_item_service_1.SideBarItemService, danhmuc_service_1.DanhMucService, product_service_1.ProductService])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map