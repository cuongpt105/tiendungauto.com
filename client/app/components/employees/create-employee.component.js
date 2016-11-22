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
var router_1 = require("@angular/router");
var employee_1 = require("../../models/employee");
var employee_service_1 = require("../../services/employee.service");
var CreateEmployeeComponent = (function () {
    function CreateEmployeeComponent(router, employeeService) {
        this.router = router;
        this.employeeService = employeeService;
    }
    CreateEmployeeComponent.prototype.ngOnInit = function () {
        this.employee = new employee_1.Employee("", "", "", new Date(), "", 0);
    };
    CreateEmployeeComponent.prototype.ngOnDestroy = function () {
    };
    CreateEmployeeComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/employees']);
    };
    CreateEmployeeComponent.prototype.create = function () {
        var _this = this;
        this.employeeService
            .createEmployee(this.employee)
            .subscribe(function (employee) {
            _this.employee = employee;
            console.log("===========print result from create");
            _this.employeeService.employeeSelected.next(employee);
        });
        this.router.navigate(['/employees'], { queryParams: { id: this.employee._id } });
    };
    CreateEmployeeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'create-employee',
            templateUrl: "./view/create-employee.component.html",
            styleUrls: ["./css/create-employee.component.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router, employee_service_1.EmployeeService])
    ], CreateEmployeeComponent);
    return CreateEmployeeComponent;
}());
exports.CreateEmployeeComponent = CreateEmployeeComponent;
//# sourceMappingURL=create-employee.component.js.map