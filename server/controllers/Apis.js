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
					user_search = request.get("https://api.yelp.com/v3/businesses/search?term=%s&location=san+jose&price=%s&radius=%d&open_now=true&limit=15" % ("restaurants", "$$", 15), headers = {
					"Authorization": "Bearer %s" % access_token
					})
					console.log(user_search);
				}
				else {
					console.log(body);
				}
			}
		);

	}
	// yelp: function(req,res){
	// 	// console.log("in controller");
	// 	// var options = {
	// 	//   	host: 'api.yelp.com',
	// 	//   	path: '/oauth2/token',
	// 	//   	method: 'POST',
	// 	//   	headers: {
	// 	//   		grant_type: "client_credentials",
	// 	// 		client_id: "Y15LUeDTm3oPU8ARaAe38g",
	// 	// 		client_secret: "0FhMr0GldraHrGWgVvmctDjTKBgT2fusunSkbUaZdnDrtWPgSj4Epxi4e6SNEATc"
	// 	//   	}
	// 	// };

	// 	// var req = https.request(options, function(res){
	// 	// 	console.log('Status: ' + res.statusCode);
 //  // 			console.log('Headers: ' + JSON.stringify(res.headers));
 //  // 			var dat;
	// 	// 	res.on('data', function(res){
	// 	// 		console.log(res);
	// 	// 		dat = dat+res;
	// 	// 	})
	// 	// 	res.on('end', function(res) {
	// 	// 		console.log(dat);
	// 	// 	})
	// 	// })
	// 	// req.end();
	// 	request.post(
	// 		''
	// 	)
	// },

}



// request.post(
//     'http://api.yelp.com/oauth2/token',
//     { json: { grant_type: 'client_credentials',
//     	client_id: "Y15LUeDTm3oPU8ARaAe38g",
//   		client_secret: "0FhMr0GldraHrGWgVvmctDjTKBgT2fusunSkbUaZdnDrtWPgSj4Epxi4e6SNEATc"
//      } },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body)
//         }
//     }
// );









