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
var gallery_1 = require('../../models/gallery');
var GalleryHolderComponent = (function () {
    function GalleryHolderComponent(elementRef) {
        this.elementRef = elementRef;
    }
    GalleryHolderComponent.prototype.ngOnInit = function () {
        this.index = 0;
        this.totalGallery = 0;
        this.isShowLeftBtnThumb = true;
        this.isShowRightBtnThumb = true;
        this.getSizeOfImageThumb();
        this.currentGallery = new gallery_1.Gallery("", "", "", "");
        this.updateInitData(this.galleries);
        this.updateBtnThumb();
    };
    GalleryHolderComponent.prototype.updateInitData = function (galleries) {
        if (galleries && galleries.length > 0) {
            this.currentGallery = galleries[0];
            this.totalGallery = galleries.length;
        }
    };
    GalleryHolderComponent.prototype.getSizeOfImageThumb = function () {
        this.thumbDisplaySize = $(this.elementRef.nativeElement.querySelector('#owl-single-product-thumbnails > .owl-wrapper-outer')).width();
        this.getItemSize();
    };
    GalleryHolderComponent.prototype.getItemSize = function () {
        this.numberItem = this.thumbDisplaySize / 72;
        this.numberItem = this.numberItem + 0.5;
        this.numberItem = parseInt("" + this.numberItem);
        this.itemThumbSize = this.thumbDisplaySize / this.numberItem;
    };
    GalleryHolderComponent.prototype.onSelectImageThumb = function (thumb) {
        this.currentGallery = thumb;
        var indexFound = this.galleries.findIndex(function (gl) {
            return (gl === thumb);
        });
        if (indexFound) {
        }
    };
    GalleryHolderComponent.prototype.onPreviousThumb = function () {
        if (this.index > 0) {
            this.index = this.index - 1;
        }
        this.updateBtnThumb();
    };
    GalleryHolderComponent.prototype.onNextThumb = function () {
        if (this.index < (this.totalGallery - this.numberItem - 1)) {
            this.index = this.index + 1;
        }
        this.updateBtnThumb();
    };
    GalleryHolderComponent.prototype.updateBtnThumb = function () {
        this.isShowLeftBtnThumb = true;
        this.isShowRightBtnThumb = true;
        if (this.index === 0) {
            this.isShowLeftBtnThumb = false;
        }
        if (this.index >= (this.totalGallery - this.numberItem - 1)) {
            this.isShowRightBtnThumb = false;
        }
        if (this.totalGallery <= this.numberItem) {
            this.isShowLeftBtnThumb = false;
            this.isShowRightBtnThumb = false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GalleryHolderComponent.prototype, "galleries", void 0);
    GalleryHolderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gallery-holder',
            templateUrl: './gallery-holder.html',
            styleUrls: ['./gallery-holder.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], GalleryHolderComponent);
    return GalleryHolderComponent;
}());
exports.GalleryHolderComponent = GalleryHolderComponent;
//# sourceMappingURL=gallery-holder.component.js.map