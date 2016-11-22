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
var bread_crumb_info_1 = require('../../models/bread-crumb-info');
var bread_crumb_broadcast_service_1 = require('../../services/bread-crumb-broadcast.service');
var menu_service_1 = require('../../services/menu.service');
var BreadCrumbComponent = (function () {
    function BreadCrumbComponent(breadcrumbBroadcast, menuService) {
        this.breadcrumbBroadcast = breadcrumbBroadcast;
        this.menuService = menuService;
    }
    BreadCrumbComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.breadCrumbActive = new bread_crumb_info_1.BreadCrumbInfo("", "");
        this.breadCrumbInfos = [];
        this.breadcrumbBroadcast.triggerBroadcast().subscribe(function (bcs) {
            _this.breadCrumbActive = new bread_crumb_info_1.BreadCrumbInfo("", "");
            _this.breadCrumbInfos = [];
            if (bcs && bcs.length > 0) {
                _this.breadCrumbInfos = [];
                var menu = _this.menuService.getMenuItemByName("trangchu");
                var breadCrumb = new bread_crumb_info_1.BreadCrumbInfo(menu.linkRef, menu.value);
                _this.breadCrumbInfos.push(breadCrumb);
                for (var _i = 0, bcs_1 = bcs; _i < bcs_1.length; _i++) {
                    var bc = bcs_1[_i];
                    _this.breadCrumbInfos.push(bc);
                }
                _this.breadCrumbActive = _this.breadCrumbInfos.pop();
            }
        });
    };
    BreadCrumbComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bread-crumb',
            templateUrl: './bread-crumb.component.html',
            styleUrls: ['./bread-crumb.component.css']
        }), 
        __metadata('design:paramtypes', [bread_crumb_broadcast_service_1.BreadCrumbInfoBroadcast, menu_service_1.MenuService])
    ], BreadCrumbComponent);
    return BreadCrumbComponent;
}());
exports.BreadCrumbComponent = BreadCrumbComponent;
//# sourceMappingURL=bread-crumb.component.js.map