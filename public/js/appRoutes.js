angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
	})
	.when('/:player_name', {
		templateUrl: 'views/player.html',
		controller: 'PlayerDataController'
	});

	$locationProvider.html5Mode(true);
}]);
