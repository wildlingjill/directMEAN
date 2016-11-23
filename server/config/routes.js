var mongoose = require('mongoose');
var users = require('../controllers/Users.js');
var apis = require('../controllers/Apis.js');
// var polls = require('../controllers/Polls.js')
var User = mongoose.model('User');
// var Poll = mongoose.model('Poll');
var http = require('http');

module.exports = function(app){

	app.post('/login', function(req, res){
		users.login(req, res);
	});

	app.post('/register', function(req, res){
		users.login(req, res);
	});

	app.post('/yelpcall', function(req, res){
		console.log("in routes");
		apis.yelp(req, res);
	});

}