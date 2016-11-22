var mongoose = require('mongoose');
var users = require('../controllers/Users.js');
// var polls = require('../controllers/Polls.js')
var User = mongoose.model('User');
// var Poll = mongoose.model('Poll');

module.exports = function(app){

	app.post('/login', function(req, res){
		users.login(req, res);
	});

	app.post('/register', function(req, res){
		users.login(req, res);
	});


//does it need an ID? 
	// app.get('/directMe', function(req, res){
	// 	users.index(req, res);
	// });

	// app.delete('/delete/:poll_id', function(req, res){
	// 	polls.delete(req, res);
	// });

	// app.get('/user', function(req,res){
	// 	var user = {
	// 		username: req.session.username
	// 	};
	// 	res.json(user);
	// });

	// app.post('/vote/:poll_id', function(req, res){
	// 	polls.vote(req,res);
	// });


	// app.post('/friends', function(req, res){
	// 	friends.create(req,res);
	// });

	// // app.put is to update an existing record, app.delete is to delete one
	// app.put('/friends/:id', function(req, res){
	// 	friends.update(req, res);
	// });


	// app.delete('/friends/:id', function(req, res){
	// 	friends.delete(req, res);
	// });

}