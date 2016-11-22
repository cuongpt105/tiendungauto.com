var Bear = require('../entity/bear');

module.exports = (app, router) => {
    router.route('/bears')
        .get(function(req, res){
		Bear.find(function(err, bears){
			if (err) res.send(err);
			
			res.json(bears);
		});
	})
	
	.post(function(req, res){
		var bear = new Bear();
		bear.name = req.body.name;
		bear.save(function(err){
			if(err) res.send(err);
			
			res.json(bear);
		});
	});

	router.route('/bears/:bear_id')
		.get(function(req, res){
			Bear.findById(req.params.bear_id,function(err, bear){
				if (err) res.send(err);
				
				res.json(bear);
			});
		})
		
		.put(function(req,res){
			Bear.findById(req.params.bear_id, function(err, bear){
				if (err) res.send(err);
				
				bear.name = req.body.name;
				bear.save(function(err){
					if (err) res.send(err);
					
					res.json(bear);
				});
			});
		})
		
		.delete(function(req, res){
			Bear.remove({_id:req.params.bear_id}, function(err){
				if (err) res.send(err);
				
				Bear.find((err, bears) => {
					if (err) res.send(err);
					res.json(bears);
				});
			});
		});
}