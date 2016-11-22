import {Component, OnInit, OnDestroy} from "@angular/core";

import {Router} from "@angular/router";

import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
    moduleId: module.id,
    selector: 'create-employee',
    templateUrl: "./view/create-employee.component.html",
    styleUrls: ["./css/create-employee.component.css"]
})


export class CreateEmployeeComponent implements OnInit, OnDestroy {
    private employee: Employee;
    private sub: any;
    
    constructor(
        private router: Router,
        private employeeService: EmployeeService
    ){}
    
    ngOnInit() {
        this.employee = new Employee("", "", "", new Date(), "", 0);
    }
    
    ngOnDestroy() {
        
    }
    
    gotoDetail() {
        this.router.navigate(['/employees']);
    }
    
    create() {
        this.employeeService
                .createEmployee(this.employee)
                .subscribe(employee => {
                    this.employee = employee;
                    
                    console.log("===========print result from create");
                    this.employeeService.employeeSelected.next(employee);
                });
        this.router.navigate(['/employees'], {queryParams: {id: this.employee._id}});
    }
}