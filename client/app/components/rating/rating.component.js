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
var RatingComponent = (function () {
    function RatingComponent() {
        this.onRating = new core_1.EventEmitter();
    }
    RatingComponent.prototype.onChangeRating = function (value) {
        this.onRating.emit(value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RatingComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RatingComponent.prototype, "numberTimeRating", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RatingComponent.prototype, "onRating", void 0);
    RatingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rating',
            templateUrl: './rating.html',
            styleUrls: ['./rating.css']
        }), 
        __metadata('design:paramtypes', [])
    ], RatingComponent);
    return RatingComponent;
}());
exports.RatingComponent = RatingComponent;
//# sourceMappingURL=rating.component.js.map