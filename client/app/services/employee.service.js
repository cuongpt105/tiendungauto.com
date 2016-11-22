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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require('rxjs/Observable');
var Rx_1 = require('rxjs/Rx');
var app_setting_1 = require('../util/app-setting');
var EmployeeService = (function () {
    function EmployeeService(http) {
        this.http = http;
        this.employeeSelected = new Rx_1.Subject();
        this.employeesUrl = app_setting_1.AppSettings.API_ENDPOINT + '/employees'; // URL to web API
    }
    EmployeeService.prototype.getEmployees = function () {
        return this.http.get(this.employeesUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.handleError = function (error) {
        //console.log('An error occurred', error);
        return Observable_1.Observable.throw(error.message || error);
    };
    EmployeeService.prototype.getEmployeeById = function (employeeId) {
        return this.http.get(this.employeesUrl + '/' + employeeId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.updateEmployee = function (employee) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.employeesUrl + "/" + employee._id;
        return this.http
            .put(url, JSON.stringify(employee), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.createEmployee = function (employee) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.employeesUrl, JSON.stringify(employee), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EmployeeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map