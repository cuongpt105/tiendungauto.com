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
var danhmuc_1 = require('../../model/danhmuc');
var danhmuc_service_1 = require('../../service/danhmuc.service');
var DanhMucComponent = (function () {
    function DanhMucComponent(danhmucService) {
        this.danhmucService = danhmucService;
    }
    DanhMucComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isCreate = false;
        this.danhmucs = [];
        this.danhmucService.getDanhMucs().subscribe(function (dm) { return _this.danhmucs = dm; });
    };
    DanhMucComponent.prototype.addRootDanhMuc = function () {
        this.isCreate = true;
        this.danhmuc = new danhmuc_1.DanhMuc();
        this.danhmuc.level = 1;
    };
    DanhMucComponent.prototype.saveDanhMuc = function () {
        var _this = this;
        this.danhmucService.saveDanhMuc(this.danhmuc).subscribe(function (dm) {
            if (_this.isCreate) {
                if (dm.parentId) {
                    _this.danhmucs = _this.danhmucService.addDanhMucToLevelInList(_this.danhmucs, dm);
                }
                else {
                    _this.danhmucs = _this.danhmucService.addDanhMucToRootList(_this.danhmucs, dm);
                }
            }
            else {
                // update danh muc in list
                _this.danhmucs = _this.danhmucService.updateSpecificDanhMucInList(_this.danhmucs, dm);
            }
            _this.isCreate = false;
            _this.danhmuc = null;
        });
    };
    DanhMucComponent.prototype.cancelDanhMuc = function () {
        this.danhmuc = null;
        this.isCreate = false;
    };
    DanhMucComponent.prototype.onCreateDanhMuc = function (parent) {
        this.isCreate = true;
        this.danhmuc = new danhmuc_1.DanhMuc();
        this.danhmuc.parentId = parent.id;
        this.danhmuc.level = (parent.level + 1);
    };
    DanhMucComponent.prototype.onEditDanhMuc = function (currentDM) {
        this.isCreate = false;
        this.danhmuc = JSON.parse(JSON.stringify(currentDM));
    };
    DanhMucComponent.prototype.onDeleteDanhMuc = function (danhmuc) {
        var _this = this;
        this.isCreate = false;
        this.danhmucService.deleteDanhMuc(danhmuc.id).subscribe(function (dms) { return _this.danhmucs = dms; });
    };
    DanhMucComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'danh-muc',
            templateUrl: "./danhmuc.component.html",
            styleUrls: ['./danhmuc.component.css']
        }), 
        __metadata('design:paramtypes', [danhmuc_service_1.DanhMucService])
    ], DanhMucComponent);
    return DanhMucComponent;
}());
exports.DanhMucComponent = DanhMucComponent;
//# sourceMappingURL=danhmuc.component.js.map