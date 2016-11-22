export class Employee {
    _id: string;
    name: string;
    firstName: string;
    birthday: Date;
    address: string;
    salary: number;
    
    public constructor(id : string, name : string, firstName : string, 
        birthday : Date, address : string, salary : number) {
        this._id = id;
        this.name = name;
        this.firstName = firstName;
        this.birthday = birthday;
        this.address = address;
        this.salary = salary;
    }
}