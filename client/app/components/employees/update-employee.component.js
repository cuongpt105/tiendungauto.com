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
var UpdateEmployeeComponent = (function () {
    function UpdateEmployeeComponent(router, route, employeeService) {
        this.router = router;
        this.route = route;
        this.employeeService = employeeService;
    }
    UpdateEmployeeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params
            .subscribe(function (params) {
            var employeeId = params["id"];
            _this.employeeService.getEmployeeById(employeeId)
                .subscribe(function (employee) { return _this.employee = employee; });
        });
    };
    UpdateEmployeeComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UpdateEmployeeComponent.prototype.gotoDetail = function () {
        var employeeId = this.employee ? this.employee._id : null;
        this.router.navigate(['/employees'], { queryParams: { id: employeeId } });
    };
    UpdateEmployeeComponent.prototype.update = function () {
        var _this = this;
        this.employeeService.updateEmployee(this.employee)
            .subscribe(function (employee) {
            _this.employee = employee;
            _this.gotoDetail();
        });
    };
    UpdateEmployeeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'update-employee',
            templateUrl: "./view/update-employee.component.html",
            styleUrls: ["./css/update-employee.component.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, employee_service_1.EmployeeService])
    ], UpdateEmployeeComponent);
    return UpdateEmployeeComponent;
}());
exports.UpdateEmployeeComponent = UpdateEmployeeComponent;
//# sourceMappingURL=update-employee.component.js.map