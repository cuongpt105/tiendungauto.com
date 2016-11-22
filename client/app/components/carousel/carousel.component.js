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
var CarouselComponent = (function () {
    function CarouselComponent(elementRef, _ngZone) {
        this.elementRef = elementRef;
        this._ngZone = _ngZone;
    }
    CarouselComponent.prototype.ngOnInit = function () {
        this.index = 0;
        this.arrowTop = 10;
        this.bulletNavigateLeft = 0;
        this.itemSize = 0;
        this.isDisplayCarousel = false;
        this.current = new gallery_1.Gallery("", "", "", "");
        this.getSizeOfItem();
    };
    CarouselComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateLayoutAfterContentLoaded(); }, 200);
    };
    CarouselComponent.prototype.onSelectBulletItem = function (item) {
        this.current = item;
        var indexFound = this.carousels.findIndex(function (gl) {
            return (gl === item);
        });
        if (indexFound >= 0) {
            this.index = indexFound;
        }
        this.updateCarouselInterval();
    };
    CarouselComponent.prototype.onPreviousItem = function () {
        if (this.index === 0) {
            this.index = this.carousels.length - 1;
        }
        else {
            this.index = this.index - 1;
        }
        this.updateCarouselInterval();
    };
    CarouselComponent.prototype.onNextItem = function () {
        if (this.index === (this.carousels.length - 1)) {
            this.index = 0;
        }
        else {
            this.index = this.index + 1;
        }
        this.updateCarouselInterval();
    };
    CarouselComponent.prototype.getSizeOfItem = function () {
        this.itemSize = $(this.elementRef.nativeElement.querySelector('.carousel-container > .carousel-content')).width();
        this.isDisplayCarousel = true;
    };
    CarouselComponent.prototype.updateLayoutAfterContentLoaded = function () {
        // check to display carousel and calculate arrow top
        var hightItem = $(this.elementRef.nativeElement.querySelector('.carousel-container > .carousel-content')).height();
        this.bulletNavigateLeft = (this.itemSize / 2) - (20 * this.total / 2);
        this.arrowTop = (hightItem / 2) - (40 / 2);
        this.updateCarouselInterval();
    };
    CarouselComponent.prototype.updateCarouselInterval = function () {
        var _this = this;
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(function () { return _this.onNextItem(); }, 3000);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CarouselComponent.prototype, "carousels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CarouselComponent.prototype, "total", void 0);
    CarouselComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'carousel',
            templateUrl: './carousel.html',
            styleUrls: ['./carousel.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
    ], CarouselComponent);
    return CarouselComponent;
}());
exports.CarouselComponent = CarouselComponent;
//# sourceMappingURL=carousel.component.js.map