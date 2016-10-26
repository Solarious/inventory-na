var app = angular.module('PlayerCtrl', []);
app.controller('PlayerController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	$scope.playerName = $routeParams.player_name;
}]);
