"use strict";
var Employee = (function () {
    function Employee(id, name, firstName, birthday, address, salary) {
        this._id = id;
        this.name = name;
        this.firstName = firstName;
        this.birthday = birthday;
        this.address = address;
        this.salary = salary;
    }
    return Employee;
}());
exports.Employee = Employee;
//# sourceMappingURL=employee.js.map