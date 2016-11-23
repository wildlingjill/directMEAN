var app = angular.module('app', ['ngRoute', 'ngMessages', 'routeStyles', 'ngCookies']);

app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!
	$routeProvider

	.when('/',{
		templateUrl: 'partials/main.html',
		controller: 'loginController',
		css: 'static/css/lstyles.css'
	})

	.when('/dashboard',{
		templateUrl: 'partials/directme.html',
		controller: 'dashController',
		css: 'static/css/styles.css'
	})

	.when('/destination',{
		templateUrl: 'partials/weather.html',
		controller: 'dashController',
		css: 'static/css/wstyles.css'
	})

	.otherwise({
		redirectTo: '/'
	});
});

app.factory('userFactory', ['$http', function($http) {
	var factory = {};

	factory.login = function(user, callback){
		$http.post('/login', user).then(function(response){
			callback(response.data);
		});
	};

	factory.register = function(user, callback){
		$http.post('/register', user).then(function(response){
			callback(response.data);
		});
	};

	return factory;

}]);

app.factory('apiFactory', ['$http', function($http){
	var factory = {};

	factory.apiCall = function(search, callback){
		console.log("In factory");
		$http.post('/yelpcall', search).then(function(response){
			console.log("Received in factory");
			console.log(response);
			console.log(response.data);
			callback(response.data);
		})
	}

	return factory;

}]);

app.controller('loginController', function($scope, userFactory, apiFactory, $routeParams, $location, $cookies, $rootScope) {


	$scope.login = function(){
		userFactory.login($scope.user, function(data){
			console.log($scope.user);
			console.log(data);
			$cookies.username = data.name;		
			console.log($cookies.username);
			$location.url('/dashboard');
		});
		// apiFactory.apiCall();
	};

	$scope.register = function(){
		userFactory.register($scope.newUser, function(data){
			$cookies.username = data.name;
			console.log($cookies.username);
			$location.url('/dashboard');
		})
	}

});

app.controller('dashController', function($scope, userFactory, apiFactory, $sce, $routeParams, $location, $cookies, $rootScope) {

	 $scope.trustSrc = function(src) {
	    return $sce.trustAsResourceUrl(src);
	}

	if ($rootScope.destination) {
		$scope.gmurl = 'https://www.google.com/maps/embed/v1/place?q=' + $rootScope.destination +'&key=AIzaSyDvR4OqyA3pxONqvIDqqtc5CfkS-GSjn_I'

	}
	

	$scope.logout = function(){
		$cookies.username = "";
		$location.url('/');
	}

	$scope.direct = function(){
		apiFactory.apiCall($scope.search, function(data){
			$rootScope.name = data.name;
			if (data.categories.isArray){
				$rootScope.type = data.categories[0]['alias'];
			} else {
				$rootScope.type = data.categories['alias'];
			}
			$rootScope.rating = data.rating;
			$rootScope.price = data.price;

			$rootScope.destination = 'new york';

			$location.url('/destination');
		})
	}
	

});
