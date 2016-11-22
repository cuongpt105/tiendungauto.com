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
var common_broadcast_service_1 = require('../../service/common-broadcast.service');
var ProductImageDetailComponent = (function () {
    function ProductImageDetailComponent(commonBroadcast) {
        this.commonBroadcast = commonBroadcast;
        this.onDataChange = new core_1.EventEmitter();
    }
    ProductImageDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateImageAfterChange();
        this.commonBroadcast.triggerBroadcast().subscribe(function (productImages) {
            _this.productImages = productImages;
            _this.updateImageAfterChange();
        });
    };
    ProductImageDetailComponent.prototype.updateImageAfterChange = function () {
        var _this = this;
        this.imagesNotSelected = this.productImages.filter(function (image) {
            var index = _this.imagesSelected.findIndex(function (img) { return img.id === image.file.id; });
            if (index >= 0) {
                return false;
            }
            else {
                return true;
            }
        });
    };
    ProductImageDetailComponent.prototype.removeImage = function (image) {
        this.imagesSelected = this.imagesSelected.filter(function (imageSelected) { return imageSelected.id !== image.id; });
        this.updateImageAfterChange();
        this.onDataChange.emit(this.imagesSelected);
    };
    ProductImageDetailComponent.prototype.addImage = function (productImage) {
        this.imagesSelected.push(productImage.file);
        this.updateImageAfterChange();
        this.onDataChange.emit(this.imagesSelected);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ProductImageDetailComponent.prototype, "imagesSelected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ProductImageDetailComponent.prototype, "productImages", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProductImageDetailComponent.prototype, "onDataChange", void 0);
    ProductImageDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'product-image-detail',
            templateUrl: './productImageDetail.component.html',
            styleUrls: ['./productImageDetail.component.css']
        }), 
        __metadata('design:paramtypes', [common_broadcast_service_1.CommonBroadcast])
    ], ProductImageDetailComponent);
    return ProductImageDetailComponent;
}());
exports.ProductImageDetailComponent = ProductImageDetailComponent;
//# sourceMappingURL=productImageDetail.component.js.map