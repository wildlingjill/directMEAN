var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!
	$routeProvider

	.when('/',{
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	})

	.when('/dashboard',{
		templateUrl: 'partials/dashboard.html',
		controller: 'dashController'
	})

	.when('/poll/:poll_id',{
		templateUrl: 'partials/poll.html',
		controller: 'viewPollController'
	})

	.when('/create',{
		templateUrl: 'partials/create.html',
		controller: 'createController'
	})

	// .when('/delete/:poll_id',{
	// 	templateUrl: 'partials/dashboard.html',
	// 	controller: 'pageController'
	// })

	.otherwise({
		redirectTo: '/'
	});
});

app.factory('pollFactory', ['$http', function($http) {
	var factory = {};

	factory.login = function(user, callback){
		$http.post('/login', user).then(function(response){
			callback(response.data);
		});
	};


	factory.getPolls = function(callback){
		$http.get('/dashboard').then(function(response){
			callback(response.data);
		});
	};


	factory.create = function(poll, callback){
		$http.post('/create', poll).then(function(response){
			callback(response.data);
		});
	};


	factory.delete = function(poll, callback){
		$http.delete('/delete/'+poll._id).then(function(response){
			callback();
		});
	};

	factory.show = function(poll_id, callback){
		$http.get('/poll/'+poll_id).then(function(response){
			callback(response.data);
		});
	};

	factory.vote = function(poll_id, option, callback){
		$http.post('/vote/'+poll_id, {option: option}).then(function(response){
			callback(response.data);
		});
	};


	// factory.create = function(newfriend,callback){
	// 	$http.post('/friends', newfriend).then(function(response){
	// 		callback(response.data);
	// 	});
	// };

	// factory.update = function(friend, callback){ 
	// 	console.log(friend);
	// 	console.log('/friends/'+friend._id);
	// 	$http.put('/friends/'+friend._id, friend).then(function(response){
	// 		callback();
	// 	})
	// };

	// factory.delete = function(friend, callback){
	// 	$http.delete('/friends/'+friend._id).then(function(response){
	// 		callback();
	// 	})
	// };

	// factory.show = function(friend_id, callback){
	// 	$http.get('/friends/'+friend_id).then(function(response){
	// 		callback(response.data);
	// 	})
	// };

	return factory;
}]);

app.factory('userFactory', ['$http', function($http) {
	var factory = {};

	factory.login = function(user, callback){
		$http.post('/login', user).then(function(response){
			callback(response.data);
		});
	};

	factory.getUser = function(callback){
		$http.get('/user').then(function(response){
			callback(response.data);
		});
	};

	return factory;

}]);

app.controller('loginController', function($scope, pollFactory, userFactory, $routeParams, $location, $cookies, $rootScope) {
/*
	THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
	WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
*/
	$scope.login = function(){
		userFactory.login($scope.user, function(data){
			console.log($scope.user);
			console.log(data);
			$cookies.username = $scope.user.name;		
			console.log($cookies.username);
			$location.url('/dashboard');
		});
	};

});

app.controller('createController', function($scope, pollFactory, userFactory, $routeParams, $location, $cookies, $rootScope){

	$scope.addPoll = function(){
		$scope.newPoll.author = $cookies.username;
		console.log($scope.newPoll);
		$scope.errors = {};
		$scope.polls = {};
		pollFactory.create($scope.newPoll, function(data){
			if(data.errors){
				console.log(data.errors);
				$scope.errors = data.errors;
			} else {
				$location.url('/dashboard');
			}
		})
	}

	// $scope.create = function(){
	// 	$scope.errors={};
	// 	friendsFactory.create($scope.newfriend, function(data){
	// 		if(data.errors){
	// 			console.log(data.errors);
	// 			$scope.errors = data.errors;
	// 		} else {
	// 			friendsFactory.index(function(data){
	// 				$scope.friends = data;
	// 				$scope.newfriend = {};
	// 				$location.url('/');
	// 			});
	// 		}
	// 	})
		
	// }

	
}); 

app.controller('dashController', function($scope, pollFactory, userFactory, $routeParams, $location, $cookies, $rootScope) {

	pollFactory.getPolls(function(data){
		$scope.polls = data;
		console.log(JSON.stringify($scope.polls, 0, 2))	
	});

	userFactory.getUser(function(user){
		$scope.username = user.username;
	});		

	$scope.delete = function(data){
		pollFactory.delete(data, function(){
			pollFactory.getPolls(function(data){
				$scope.polls = data;
			});
		});
	};

});

app.controller('viewPollController', function($scope, pollFactory, userFactory, $routeParams, $location, $cookies, $rootScope){

	pollFactory.show($routeParams.poll_id, function(data){
		$scope.poll = data;
	});

	$scope.incVote = function(option){
		pollFactory.vote($routeParams.poll_id, option, function(){
			pollFactory.show($routeParams.poll_id, function(data){
				$scope.poll = data;
			});
		});
	};

})
// 	console.log($routeParams);
// 	friendsFactory.show($routeParams.friend_id, function(data){
// 		$scope.friend = data;
// 		console.log($scope.friend);
// 	});
	
	
// 	$scope.update = function(data){
// 		console.log($scope.updateFriend);
// 		if (!$scope.updateFriend.friend_id){
// 			$scope.updateFriend._id = $routeParams.friend_id;
// 		}
// 		friendsFactory.update($scope.updateFriend, function(){
// 			friendsFactory.index(function(data){
// 				$scope.friends = data;
// 				$scope.updateFriend = {};
// 				$location.url('/');
// 			})
// 		})
// 	}


