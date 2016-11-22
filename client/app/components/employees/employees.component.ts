import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params, Router } from "@angular/router";
import { Location }                 from '@angular/common';

import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
    moduleId: module.id,
    templateUrl: "./view/employees.component.html",
    styleUrls: ["./css/employees.component.css"],
    providers: [EmployeeService]
})

export class EmployeesComponent implements OnInit, OnDestroy {
   employees: Employee[];
   private employeeId: String;
   private employeeSelected: Employee;
   private sub: any;
    
    public constructor(
        private employeeService: EmployeeService,
        private route: ActivatedRoute,
        private router: Router) {
            this.employeeService.employeeSelected.subscribe(employee => 
                        this.handleEmployeeSelectedFromChild(employee));
        }
        
   handleEmployeeSelectedFromChild(employee : Employee) {
       this.employeeSelected = employee;
       console.log("==========employee from child:"+JSON.stringify(employee));
   }
    
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
        });
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    
    isSelectedEmployee(employeeId: string) {
        return this.employeeId === employeeId;
    }
    
    createEmployee() {
        this.router.navigate(['/employees/create']);
    }
    
    viewEmployee(employeeId: string) {
        this.router.navigate(['/employees/view', employeeId]);
    }
    
    updateEmployee(employeeId: string) {
        this.router.navigate(['/employees/update', employeeId]);
    }
}