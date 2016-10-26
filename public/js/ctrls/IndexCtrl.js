var app = angular.module('IndexCtrl', [])
app.controller('IndexController', ['$scope', '$http', '$routeParams',
'$rootScope', '$location', 'Players',
function($scope, $http, $routeParams, $rootScope, $location, Players) {
	$scope.getPlayers = function() {
		Players.get().success(function(data) {
			$scope.players = data;
		});
	};

	$scope.createPlayer = function() {
		if ($scope.newPlayerName != null) {
			Players.create($scope.newPlayerName)
			.then(function(res) {
				$scope.newPlayerName = "";
				$scope.getPlayers();
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
		});
		$scope.toggleDelete();
		if (name === $scope.playerName)
			$location.path('/');
	};

	$scope.getPlayerData = function() {
		if ($scope.playerName) {
			Players.get($scope.playerName)
			.success(function(data) {
				$scope.playerData = data;
			});
		}
	};

	$scope.updatePlayerData = function() {
		console.log('updatePlayerData called');
		Players.update($scope.playerName, $scope.playerData)
		.then(function(res) {
		});
	};

	$rootScope.$on('$routeChangeSuccess', function() {
		$scope.playerName = $routeParams.player_name;
		//$scope.getPlayerData();
		//console.log($routeParams.player_name);
	});

	$scope.navStyle = function(name) {
		if ($scope.playerName === name)
			return {'font-weight': 'bold'};
		else
			return {};
	}

	$scope.addItem = function(container) {
		container.items.push({
			name: "",
			quantity: 1,
			weight: 0
		});
	};

	$scope.removeItem = function(container, item) {
		var index = container.items.indexOf(item);
		container.items.splice(index, 1);
		$scope.updatePlayerData();
	};

	$scope.moveItem = function(originalContainer, item, newContainer) {
		var index = originalContainer.items.indexOf(item);
		originalContainer.items.splice(index, 1);
		newContainer.items.push(item);
		$scope.updatePlayerData();
	};

	$scope.addContainer = function() {
		$scope.playerData.containers.push({
			name: "",
			items: [{
				name: "",
				quantity: 1,
				weight: 0
			}]
		});
	};

	$scope.removeContainer = function(container) {
		var index = $scope.playerData.containers.indexOf(container);
		$scope.playerData.containers.splice(index, 1);
		$scope.updatePlayerData();
	};

	$scope.totalWeight = function(container) {
		var total = 0
		for (var i = 0; i < container.items.length; i++) {
			var item = container.items[i]
			total += Number(item.quantity) * Number(item.weight);
		}
		return total;
	};

	$scope.getPlayers();
	$scope.showDelete = false;
	$scope.playerName = $routeParams.player_name;
	$scope.getPlayerData();
}]);
