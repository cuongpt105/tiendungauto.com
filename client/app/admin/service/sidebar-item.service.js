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
var SIDEBAR_ITEMS = [
    { name: 'gioithieu', value: 'Gioi Thieu', linkRef: '/admin/gioithieu', iconClass: 'fa-info' },
    { name: 'header', value: 'Header', linkRef: '/admin/header', iconClass: 'fa-header' },
    { name: 'dichvu', value: 'Dich Vu', linkRef: '/admin/dichvu', iconClass: 'fa-tachometer' },
    { name: 'khuyenmai', value: 'Khuyen Mai', linkRef: '/admin/khuyenmai', iconClass: 'fa-tachometer' },
    { name: 'tintuc', value: 'Tin Tuc', linkRef: '/admin/tintuc', iconClass: 'fa-tachometer' },
    { name: 'bando', value: 'Ban Do', linkRef: '/admin/bando', iconClass: 'fa-tachometer' },
    { name: 'thanhtoan', value: 'Thanh Toan', linkRef: '/admin/thanhtoan', iconClass: 'fa-tachometer' },
    { name: 'lienhe', value: 'Lien He', linkRef: '/admin/lienhe', iconClass: 'fa-tachometer' },
    { name: 'danhmuc', value: 'Danh Muc', linkRef: '/admin/danhmuc', iconClass: 'fa-tachometer' },
    { name: 'sanpham', value: 'San Pham', linkRef: '/admin/sanpham', iconClass: 'fa-tachometer' },
    { name: 'galary', value: 'Galary', linkRef: '/admin/galary', iconClass: 'fa-tachometer' },
];
var SideBarItemService = (function () {
    function SideBarItemService() {
    }
    SideBarItemService.prototype.getSidebarItems = function () {
        return SIDEBAR_ITEMS;
    };
    SideBarItemService.prototype.getItemByName = function (name) {
        var result = this.getSidebarItems().filter(function (item) {
            return (item.name === name);
        });
        return result ? result[0] : null;
    };
    SideBarItemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SideBarItemService);
    return SideBarItemService;
}());
exports.SideBarItemService = SideBarItemService;
//# sourceMappingURL=sidebar-item.service.js.map