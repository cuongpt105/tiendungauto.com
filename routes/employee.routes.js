var Employee = require('../entity/employee');

module.exports = (app, router) => {
    router.route('/employees')
        .get(function(req, res) {
            Employee.find({}, function(err, employees){
                if (err) res.send(err);

              // employees.push(employes);

                res.json(employees);
            });
        })
        .post(function(req, res){
            let employee = new Employee();
            employee.name = req.body.name;
            employee.firstName = req.body.firstName;
            employee.birthday = req.body.birthday;
            employee.address = req.body.address;
            employee.salary = req.body.salary;

            employee.save(function(err){
                if (err) {
                    res.send(err);
                }

                res.json(employee);
            });
        });

    router.route('/employees/:employee_id')
		.get(function(req, res){
			Employee.findById(req.params.employee_id,function(err, employee){
				if (err) res.send(err);

				res.json(employee);
			});
		})

		.put(function(req,res){
			Employee.findById(req.params.employee_id, function(err, employee){
				if (err) res.send(err);

                employee = Object.assign(employee, req.body);

				employee.save(function(err){
					if (err) res.send(err);

					res.json(employee);
				});
			});
		})

		.delete(function(req, res){
			Employee.remove({_id:req.params.employee_id}, function(err){
				if (err) res.send(err);

                Employee.find((err, employees) => {
                    if (err) res.send(err);
                    res.json(employees);
                })
			});
		});
}
