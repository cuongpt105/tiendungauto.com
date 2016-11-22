import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { employeesRouting } from './employees.routing';

import {CreateEmployeeComponent}    from './create-employee.component';
import {EmployeeCenterComponent}    from './employee-center.component';
import {EmployeesComponent}         from './employees.component';
import {UpdateEmployeeComponent}    from './update-employee.component';
import {ViewEmployeeComponent}      from './view-employee.component';

import {EmployeeService} from '../../services/employee.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    employeesRouting
  ],
  declarations: [
     CreateEmployeeComponent, 
     EmployeeCenterComponent,
     EmployeesComponent, 
     UpdateEmployeeComponent, 
     ViewEmployeeComponent
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeesModule {}