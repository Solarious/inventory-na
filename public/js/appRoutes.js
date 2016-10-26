angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'IndexController'
	})
	.when('/:player_name', {
		templateUrl: 'views/player.html',
		controller: 'IndexController'
	});

	$locationProvider.html5Mode(true);
}]);
