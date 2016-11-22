var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployeeSchema   = new Schema({
    name: String,
    firstName: String,
    birthday: Date,
    address: String,
    salary: Number
});

module.exports = mongoose.model('Employee', EmployeeSchema);