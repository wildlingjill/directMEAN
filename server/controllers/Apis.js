// var mongoose = require('mongoose');
// var User = mongoose.model('User');
var http = require('http');
var https = require('https');
var requestify = require('requestify');
var request = require('request')

module.exports = {
	yelp: function(req, res) {
		request.post(
			{ 
				url: 'https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=Y15LUeDTm3oPU8ARaAe38g&client_secret=0FhMr0GldraHrGWgVvmctDjTKBgT2fusunSkbUaZdnDrtWPgSj4Epxi4e6SNEATc',
			},
			function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log('body', body)
					var body = JSON.parse(body);
					console.log(body.access_token);
					var access_token = body["access_token"];
					var category = req.body.category;
					var price = req.body.price;
					if (price == "$"){
						price = 1;
					} else if (price == "$$") {
						price = 2;
					} else if (price == "$$$") {
						price = 3;
					} else {
						price = 4;
					}
					var distance = req.body.distance;
					var options = {
						url: "https://api.yelp.com/v3/businesses/search?term=" + category + "&location=san+jose&price=" + price + "&radius=" + distance + "&open_now=true&limit=15", 
						method: 'GET',
						headers: {
							"Authorization": "Bearer " + access_token
						}
					}
					request(options, function(err, response, body){
						// console.log('response', response);
						console.log('businesses:', JSON.parse(body).businesses);
						var choices = JSON.parse(body).businesses;
						var random_choice = choices[Math.floor(Math.random() * choices.length)];
						console.log("random choice: ", random_choice);
						res.json(random_choice);

					})
				}
				else {
					console.log(body);
				}
			}
		);

	}
}