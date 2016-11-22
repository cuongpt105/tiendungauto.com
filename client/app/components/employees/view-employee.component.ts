import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';

import {Employee} from "../../models/Employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
    moduleId: module.id,
    templateUrl: './view/view-employee.component.html',
    styleUrls: ['./css/view-employee.component.css']
})

export class ViewEmployeeComponent implements OnInit, OnDestroy {
    employee: Employee;
    
    private sub: any;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private employeeService: EmployeeService
    ) {}
    
    
    ngOnInit() {
        this.sub = this.route.params
            .subscribe(params => {
                let employeeId : string = params["id"];
                this.employeeService.getEmployeeById(employeeId)
                .subscribe(employeeFilter => this.employee = employeeFilter);
            });
    }
    
    ngOnDestroy() {
     this.sub.unsubscribe();   
    }
    
    gotoDetail() {
        let employeeId = this.employee ? this.employee._id : null;
        
        this.router.navigate(['/employees'], {queryParams: {id: employeeId}});
        console.log("===========print result from view");
        this.employeeService.employeeSelected.next(this.employee);
    }
}