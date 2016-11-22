var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

	login: function(req,res){
		User.findOne({email: req.body.email}, function(err, data){
			if(err){
				console.log(err);
				res.json(err);
			} else if (!data){
				res.json({errors: {email: {message: "Email does not exist."}}})
			} else {
				// Email found, now check password:
				data.comparePassword(req.body.password, function(err, isMatch){
					if(err)
						res.json(err);
					else if(!isMatch)
						res.json ({errors:{password: {message: "Username/password does not match."}}});
					else {
						res.json({
							email: data.email,
							name: data.name,
							city: data.city
						});
					}
				});
			}
		});
	},


	register: function(req,res){
		User.findOne({email: req.body.email}, function(err, data){
			if(err){
				console.log(err);
				res.json(err);
			} else if (data.length > 0){
				res.json({errors:{email: {message: 'Email already exists.'}}})
			} else {
				var user = new User({
					name: req.body.name,
					email: req.body.email,
					city: req.body.city,
					password: req.body.password
				});
				user.save(function(err, data){
					if(err){
						console.log(err);
						res.json(err);
					} else {
						console.log(data);
						req.session.username = req.body.name;
						res.json({
							email: data.email,
							name: data.name,
							city: data.city
						});					}
				});
			}
		});
	},


	index: function(req,res){
		User.find({}, function(err, data){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				console.log('successfully found User');
				console.log(data);
				res.json(data);
			}
		});
	},



}

