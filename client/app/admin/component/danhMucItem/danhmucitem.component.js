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
var DanhMucItemComponent = (function () {
    function DanhMucItemComponent() {
        this.onCreateDanhMuc = new core_1.EventEmitter();
        this.onEditDanhMuc = new core_1.EventEmitter();
        this.onDeleteDanhMuc = new core_1.EventEmitter();
    }
    DanhMucItemComponent.prototype.ngOnInit = function () {
    };
    DanhMucItemComponent.prototype.createDanhMuc = function (parent) {
        this.onCreateDanhMuc.emit(parent);
    };
    DanhMucItemComponent.prototype.editDanhMuc = function (currentDM) {
        this.onEditDanhMuc.emit(currentDM);
    };
    DanhMucItemComponent.prototype.deleteDanhMuc = function (danhmuc) {
        this.onDeleteDanhMuc.emit(danhmuc);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DanhMucItemComponent.prototype, "danhmucs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DanhMucItemComponent.prototype, "onCreateDanhMuc", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DanhMucItemComponent.prototype, "onEditDanhMuc", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DanhMucItemComponent.prototype, "onDeleteDanhMuc", void 0);
    DanhMucItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'danh-muc-item',
            templateUrl: "./danhmucitem.component.html",
            styleUrls: ['./danhmucitem.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DanhMucItemComponent);
    return DanhMucItemComponent;
}());
exports.DanhMucItemComponent = DanhMucItemComponent;
//# sourceMappingURL=danhmucitem.component.js.map