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
var sidebar_item_1 = require('../model/sidebar-item');
var sidebar_item_service_1 = require('../service/sidebar-item.service');
var sidebar_item_broadcast_service_1 = require('../service/sidebar-item-broadcast.service');
var AdminComponent = (function () {
    function AdminComponent(sidebarItemService, sidebarItemBroadcast) {
        this.sidebarItemService = sidebarItemService;
        this.sidebarItemBroadcast = sidebarItemBroadcast;
        this.itemSelected = new sidebar_item_1.SideBarItem();
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSideBarCollapsed = true;
        this.items = this.sidebarItemService.getSidebarItems();
        this.sidebarItemBroadcast.itemSubject.subscribe(function (item) { return _this.itemSelected = item; });
    };
    AdminComponent.prototype.toggle = function () {
        this.isSideBarCollapsed = !this.isSideBarCollapsed;
    };
    AdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-app',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.css']
        }), 
        __metadata('design:paramtypes', [sidebar_item_service_1.SideBarItemService, sidebar_item_broadcast_service_1.SidebarItemBroadcast])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map