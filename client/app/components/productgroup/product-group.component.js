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
var field_sort_1 = require('../../models/field-sort');
var ProductGroupComponent = (function () {
    function ProductGroupComponent() {
        this.onSortChange = new core_1.EventEmitter();
        this.onPageChange = new core_1.EventEmitter();
    }
    ProductGroupComponent.prototype.ngOnInit = function () {
        this.isDescendant = true;
        this.fieldsSort = this.getFieldsSortData();
        this.currentFieldSort = this.fieldsSort[0];
    };
    ProductGroupComponent.prototype.getFieldsSortData = function () {
        var fieldsSort = [];
        var dateSort = new field_sort_1.FieldSort("date", "Ngày");
        var priceSort = new field_sort_1.FieldSort("price", "Giá");
        fieldsSort.push(dateSort);
        fieldsSort.push(priceSort);
        return fieldsSort;
    };
    ProductGroupComponent.prototype.detailProduct = function (product) {
    };
    ProductGroupComponent.prototype.sortFieldChange = function (field) {
        this.currentFieldSort = field;
        if (this.isDescendant) {
            this.onSortChange.emit(this.currentFieldSort.name + " desc");
        }
        else {
            this.onSortChange.emit(this.currentFieldSort.name);
        }
    };
    ProductGroupComponent.prototype.sortChange = function () {
        this.isDescendant = !this.isDescendant;
        this.sortFieldChange(this.currentFieldSort);
    };
    ProductGroupComponent.prototype.pageChange = function (event) {
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
        this.onPageChange.emit(event.page);
    };
    ProductGroupComponent.prototype.addToCart = function (product) {
        ///gio-hang/{{product.id}}
    };
    ProductGroupComponent.prototype.addToWishlist = function (product) {
    };
    ProductGroupComponent.prototype.addToCompare = function (product) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ProductGroupComponent.prototype, "isShowSort", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ProductGroupComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ProductGroupComponent.prototype, "total", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ProductGroupComponent.prototype, "limit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ProductGroupComponent.prototype, "currentPage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ProductGroupComponent.prototype, "products", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProductGroupComponent.prototype, "onSortChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProductGroupComponent.prototype, "onPageChange", void 0);
    ProductGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'product-group',
            templateUrl: './product-group.html',
            styleUrls: ['./product-group.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ProductGroupComponent);
    return ProductGroupComponent;
}());
exports.ProductGroupComponent = ProductGroupComponent;
//# sourceMappingURL=product-group.component.js.map