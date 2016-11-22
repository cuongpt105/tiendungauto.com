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
var router_1 = require('@angular/router');
var employee_service_1 = require("../../services/employee.service");
var ViewEmployeeComponent = (function () {
    function ViewEmployeeComponent(route, router, employeeService) {
        this.route = route;
        this.router = router;
        this.employeeService = employeeService;
    }
    ViewEmployeeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params
            .subscribe(function (params) {
            var employeeId = params["id"];
            _this.employeeService.getEmployeeById(employeeId)
                .subscribe(function (employeeFilter) { return _this.employee = employeeFilter; });
        });
    };
    ViewEmployeeComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ViewEmployeeComponent.prototype.gotoDetail = function () {
        var employeeId = this.employee ? this.employee._id : null;
        this.router.navigate(['/employees'], { queryParams: { id: employeeId } });
        console.log("===========print result from view");
        this.employeeService.employeeSelected.next(this.employee);
    };
    ViewEmployeeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './view/view-employee.component.html',
            styleUrls: ['./css/view-employee.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, employee_service_1.EmployeeService])
    ], ViewEmployeeComponent);
    return ViewEmployeeComponent;
}());
exports.ViewEmployeeComponent = ViewEmployeeComponent;
//# sourceMappingURL=view-employee.component.js.map