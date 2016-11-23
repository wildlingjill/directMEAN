var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

// var angularMaterialize = require('angular-materialize');
// angular.module('app', [angularMaterialize]);


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(session({ secret: 'keyboard cat'}));

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');

routes_setter(app);

app.listen(8000, function(){
	console.log("Listening on port 8000");
});