import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
    moduleId: module.id,
    selector: 'update-employee',
    templateUrl: "./view/update-employee.component.html",
    styleUrls: ["./css/update-employee.component.css"]
})

export class UpdateEmployeeComponent implements OnInit, OnDestroy {
    employee: Employee;
    private sub: any;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private employeeService: EmployeeService
    ){}
    
    ngOnInit() {
        this.sub = this.route.params
            .subscribe(params => {
                let employeeId = params["id"];
                this.employeeService.getEmployeeById(employeeId)
                    .subscribe(employee => this.employee = employee);
            });
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    
    gotoDetail() {
        let employeeId = this.employee ? this.employee._id : null;
        this.router.navigate(['/employees'], {queryParams: {id: employeeId}});
    }
    
    update() {
        this.employeeService.updateEmployee(this.employee)
            .subscribe(employee => {
                this.employee = employee;
                this.gotoDetail();
            });
    }
}