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
var common_broadcast_service_1 = require('../../service/common-broadcast.service');
var product_service_1 = require('../../service/product.service');
var productimage_service_1 = require('../../service/productimage.service');
var ProductModifyComponent = (function () {
    function ProductModifyComponent(broadcast, productService, productImageService, _ngZone) {
        this.broadcast = broadcast;
        this.productService = productService;
        this.productImageService = productImageService;
        this._ngZone = _ngZone;
        this.onCancelProduct = new core_1.EventEmitter();
        this.onSaveProduct = new core_1.EventEmitter();
    }
    ProductModifyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productImages = [];
        this.filesToUpload = [];
        this.numberOfDataUpload = 0;
        this.productImageService.percentUploaded.subscribe(function (percent) {
            _this._ngZone.run(function () { return _this.numberOfDataUpload = percent; });
        });
        if (this.product.id) {
            this.productImageService.getProductImages(this.product.id)
                .subscribe(function (files) {
                _this.productImages = files;
                _this.broadcast.broadCastValue(_this.productImages);
            });
        }
    };
    ProductModifyComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        this.filesToUpload = [];
        this.filesToUpload = fileInput.target.files;
        if (this.product.id) {
            this.productImageService.uploadLoadFile(this.product.id, this.filesToUpload)
                .subscribe(function (productImages) { return _this.productImages = productImages; });
        }
        else {
            var product = new product_1.Product();
            product.danhmuc = this.product.danhmuc;
            this.productService.saveProductAsDraft(product).subscribe(function (product) {
                _this.product.id = product.id;
                _this.productImageService.uploadLoadFile(product.id, _this.filesToUpload)
                    .subscribe(function (productImages) { return _this.productImages = productImages; });
            });
        }
    };
    ProductModifyComponent.prototype.imageDetailChange = function (filesSelect) {
        this.product.imagesDetail = [];
        this.product.imagesDetail = filesSelect;
    };
    ProductModifyComponent.prototype.deleteFile = function (productImage) {
        var _this = this;
        this.productImageService.deleteFile(productImage.id)
            .subscribe(function (productImages) { return _this.productImages = productImages; });
    };
    ProductModifyComponent.prototype.selectMainImage = function (file) {
        this.product.mainImage = file;
    };
    ProductModifyComponent.prototype.saveProduct = function () {
        this.onSaveProduct.emit(this.product);
    };
    ProductModifyComponent.prototype.cancelProduct = function () {
        8;
        this.onCancelProduct.emit(this.product);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', product_1.Product)
    ], ProductModifyComponent.prototype, "product", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProductModifyComponent.prototype, "onCancelProduct", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProductModifyComponent.prototype, "onSaveProduct", void 0);
    ProductModifyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'product-modify',
            templateUrl: "./productmodify.component.html",
            styleUrls: ['./productmodify.component.css']
        }), 
        __metadata('design:paramtypes', [common_broadcast_service_1.CommonBroadcast, product_service_1.ProductService, productimage_service_1.ProductImageService, core_1.NgZone])
    ], ProductModifyComponent);
    return ProductModifyComponent;
}());
exports.ProductModifyComponent = ProductModifyComponent;
//# sourceMappingURL=productmodify.component.js.map