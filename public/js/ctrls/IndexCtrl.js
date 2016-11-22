var app = angular.module('IndexCtrl', [])
app.controller('IndexController', ['$scope', '$http', '$routeParams',
'$rootScope', '$location', 'Players',
function($scope, $http, $routeParams, $rootScope, $location, Players) {
	$scope.getPlayers = function() {
		Players.get()
		.then(function(res) {
			$scope.players = res.data;
		}, function(res) {
			$scope.addAlert("Failed to get player list from server");
		});
	};

	$scope.createPlayer = function() {
		if ($scope.newPlayerName != null) {
			Players.create($scope.newPlayerName)
			.then(function(res) {
				$scope.newPlayerName = "";
				$scope.getPlayers();
			}, function(res) {
				$scope.addAlert("Failed to create player");
			});
		}
	};

	$scope.toggleDelete = function() {
		$scope.showDelete = !$scope.showDelete;
	};

	$scope.deletePlayer = function(name) {
		Players.delete(name)
		.then(function(res) {
			$scope.getPlayers();
		}, function(res) {
			$scope.addAlert("Failed to delete player");
		});
		if (name === $scope.playerName)
			$location.path('/');
	};

	$scope.setPlayerName = function() {
		$scope.playerName = $routeParams.player_name;
	};

	$scope.navClass = function(name) {
		if ($scope.playerName === name)
			return 'selected-player';
		else
			return '';
	}

	$scope.addAlert = function(msg, type) {
		if (!$scope.alerts)
			$scope.alerts = [];
		$scope.alerts.push({
			msg: msg,
			type: type
		});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.showConfirmDeleteModal = function(playerName) {
		$scope.modalPlayerName = playerName;
		$('#addItemModal').modal('hide');
		$('#confirmDeleteModal').modal('show');
		$scope.toggleDelete();
	};

	$scope.confirmDeleteModalAction = function() {
		$scope.deletePlayer($scope.modalPlayerName);
		$('#confirmDeleteModal').modal('hide');
	};

	$scope.getPlayers();
	$scope.showDelete = false;
	$scope.setPlayerName();
}]);
