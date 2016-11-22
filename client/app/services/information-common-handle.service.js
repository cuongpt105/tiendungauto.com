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
var menu_item_1 = require('../models/menu-item');
var header_info_1 = require('../models/header-info');
var menu_item_broadcast_service_1 = require('./menu-item-broadcast.service');
var header_info_broadcast_service_1 = require('./header-info-broadcast.service');
var bread_crumb_broadcast_service_1 = require('./bread-crumb-broadcast.service');
var InformationCommonHandle = (function () {
    function InformationCommonHandle(menuItemBroadcast, headerInfoBroadcast, breadCrumbInfoBroadcast) {
        this.menuItemBroadcast = menuItemBroadcast;
        this.headerInfoBroadcast = headerInfoBroadcast;
        this.breadCrumbInfoBroadcast = breadCrumbInfoBroadcast;
        this.breadcrumbInfos = [];
    }
    InformationCommonHandle.prototype.init = function () {
        this.menuItem = new menu_item_1.MenuItem("", "", "");
        this.headerInfo = new header_info_1.HeaderInfo("", "", "", "");
        this.breadcrumbInfos = [];
        return this;
    };
    InformationCommonHandle.prototype.addMenuItem = function (menuItem) {
        this.menuItem = menuItem;
        return this;
    };
    InformationCommonHandle.prototype.addHeaderInfo = function (headerInfo) {
        this.headerInfo = headerInfo;
        return this;
    };
    InformationCommonHandle.prototype.addBreadCrumbs = function (breadCrumbs) {
        this.breadcrumbInfos = breadCrumbs;
        return this;
    };
    InformationCommonHandle.prototype.fireUpdateData = function () {
        this.menuItemBroadcast.broadCastValue(this.menuItem);
        this.headerInfoBroadcast.broadCastValue(this.headerInfo);
        this.breadCrumbInfoBroadcast.broadCastValue(this.breadcrumbInfos);
    };
    InformationCommonHandle = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [menu_item_broadcast_service_1.MenuItemBroadcast, header_info_broadcast_service_1.HeaderInfoBroadcast, bread_crumb_broadcast_service_1.BreadCrumbInfoBroadcast])
    ], InformationCommonHandle);
    return InformationCommonHandle;
}());
exports.InformationCommonHandle = InformationCommonHandle;
//# sourceMappingURL=information-common-handle.service.js.map