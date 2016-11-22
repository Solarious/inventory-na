angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: ['$scope', function($scope) {
			$scope.setPlayerName();
		}]
	})
	.when('/characters/:player_name', {
		templateUrl: 'views/player.html',
		controller: 'PlayerDataController'
	});

	$locationProvider.html5Mode(true);
}]);
