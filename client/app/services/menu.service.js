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
    { name: 'trangchu', value: 'Trang Chủ', linkRef: '/trang-chu' },
    { name: 'gioithieu', value: 'Giới Thiệu', linkRef: '/gioi-thieu' },
    { name: 'dichvu', value: 'Dịch Vụ', linkRef: '/dich-vu' },
    //{name: 'khuyenmai', value: 'Khuyến Mãi', linkRef: '/khuyen-mai'},
    { name: 'tintuc', value: 'Tin Tức', linkRef: '/tin-tuc' },
    { name: 'bando', value: 'Bản Đồ', linkRef: '/ban-do' },
    { name: 'thanhtoan', value: 'Thanh Toán', linkRef: '/thanh-toan' },
    { name: 'lienhe', value: 'Liên Hệ', linkRef: '/lien-he' }
];
var MenuService = (function () {
    function MenuService() {
    }
    MenuService.prototype.getSidebarItems = function () {
        return SIDEBAR_ITEMS;
    };
    MenuService.prototype.getMenuItemByName = function (name) {
        var result = this.getSidebarItems().filter(function (item) {
            return (item.name === name);
        });
        return result ? result[0] : null;
    };
    MenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map