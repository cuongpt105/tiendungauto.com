"use strict";
var router_1 = require('@angular/router');
var employee_center_component_1 = require('./employee-center.component');
var employees_component_1 = require('./employees.component');
var view_employee_component_1 = require('./view-employee.component');
var create_employee_component_1 = require('./create-employee.component');
var update_employee_component_1 = require('./update-employee.component');
var employeesRoutes = [
    //{
    //    path: '',
    //    redirectTo: '/employees',
    //    pathMatch: 'full'
    //},
    {
        path: 'employees', component: employee_center_component_1.EmployeeCenterComponent,
        children: [
            { path: '', component: employees_component_1.EmployeesComponent },
            { path: 'view/:id', component: view_employee_component_1.ViewEmployeeComponent },
            { path: 'update/:id', component: update_employee_component_1.UpdateEmployeeComponent },
            { path: 'create', component: create_employee_component_1.CreateEmployeeComponent }
        ]
    }
];
exports.employeesRouting = router_1.RouterModule.forChild(employeesRoutes);
//# sourceMappingURL=employees.routing.js.map