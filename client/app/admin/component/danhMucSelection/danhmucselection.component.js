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
var DanhMucSelectionComponent = (function () {
    function DanhMucSelectionComponent() {
        this.onSelection = new core_1.EventEmitter();
    }
    DanhMucSelectionComponent.prototype.ngOnInit = function () { };
    DanhMucSelectionComponent.prototype.selectDanhMuc = function (danhmuc) {
        this.onSelection.emit(danhmuc);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DanhMucSelectionComponent.prototype, "danhmucs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DanhMucSelectionComponent.prototype, "onSelection", void 0);
    DanhMucSelectionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'danh-muc-selection',
            templateUrl: "./danhmucselection.component.html",
            styleUrls: ['./danhmucselection.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DanhMucSelectionComponent);
    return DanhMucSelectionComponent;
}());
exports.DanhMucSelectionComponent = DanhMucSelectionComponent;
//# sourceMappingURL=danhmucselection.component.js.map