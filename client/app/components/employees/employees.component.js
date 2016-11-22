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
var employee_service_1 = require("../../services/employee.service");
var EmployeesComponent = (function () {
    function EmployeesComponent(employeeService, route, router) {
        var _this = this;
        this.employeeService = employeeService;
        this.route = route;
        this.router = router;
        this.employeeService.employeeSelected.subscribe(function (employee) {
            return _this.handleEmployeeSelectedFromChild(employee);
        });
    }
    EmployeesComponent.prototype.handleEmployeeSelectedFromChild = function (employee) {
        this.employeeSelected = employee;
        console.log("==========employee from child:" + JSON.stringify(employee));
    };
    EmployeesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.employeeService.getEmployees().subscribe(function (employees) { return _this.employees = employees; });
        });
    };
    EmployeesComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    EmployeesComponent.prototype.isSelectedEmployee = function (employeeId) {
        return this.employeeId === employeeId;
    };
    EmployeesComponent.prototype.createEmployee = function () {
        this.router.navigate(['/employees/create']);
    };
    EmployeesComponent.prototype.viewEmployee = function (employeeId) {
        this.router.navigate(['/employees/view', employeeId]);
    };
    EmployeesComponent.prototype.updateEmployee = function (employeeId) {
        this.router.navigate(['/employees/update', employeeId]);
    };
    EmployeesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "./view/employees.component.html",
            styleUrls: ["./css/employees.component.css"],
            providers: [employee_service_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [employee_service_1.EmployeeService, router_1.ActivatedRoute, router_1.Router])
    ], EmployeesComponent);
    return EmployeesComponent;
}());
exports.EmployeesComponent = EmployeesComponent;
//# sourceMappingURL=employees.component.js.map