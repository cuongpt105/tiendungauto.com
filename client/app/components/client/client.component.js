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
var header_info_broadcast_service_1 = require('../../services/header-info-broadcast.service');
var ClientAppComponent = (function () {
    function ClientAppComponent(headerInfoBroadcast) {
        this.headerInfoBroadcast = headerInfoBroadcast;
    }
    ClientAppComponent.prototype.ngAfterViewInit = function () {
        this.headerInfoBroadcast.triggerBroadcast().subscribe(function (headerInfo) {
            $('html head').find('title').text(headerInfo.title);
            $("meta[name='keywords']").attr("content", headerInfo.keyword);
            $("meta[name='description']").attr("content", headerInfo.description);
        });
    };
    ClientAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'client-app',
            templateUrl: './client.component.html',
            styleUrls: ['./client.component.css']
        }), 
        __metadata('design:paramtypes', [header_info_broadcast_service_1.HeaderInfoBroadcast])
    ], ClientAppComponent);
    return ClientAppComponent;
}());
exports.ClientAppComponent = ClientAppComponent;
//# sourceMappingURL=client.component.js.map