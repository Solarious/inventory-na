var app = angular.module('PlayerDataCtrl', []);
app.controller('PlayerDataController', ['$scope', 'Players',
function($scope, Players) {
	$scope.getPlayerData = function() {
		if ($scope.playerName) {
			Players.get($scope.playerName)
			.then(function(res) {
				$scope.playerData = res.data;
			}, function(res) {
				$scope.addAlert("Failed to get player data from server");
			});
		}
	};

	$scope.updatePlayerData = function() {
		console.log('updatePlayerData called');
		Players.update($scope.playerName, $scope.playerData)
		.then(function(res) {
		}, function(res) {
			$scope.addAlert("Failed to update player data");
		});
	};

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

	$scope.showAddItemModal = function(container) {
		$scope.modalContainer = container;
		$('#confirmDeleteModal').modal('hide');
		$('#addItemModal').modal('show');
	};

	$scope.addItemModalAction = function() {
		var count = Number($scope.addItemQuantity);
		for (var i = 0; i < count; i++) {
			$scope.addItem($scope.modalContainer);
		}
		$('#addItemModal').modal('hide');
	}

	$scope.setPlayerName();
	$scope.getPlayerData();
	$('#addItemModal').on('shown.bs.modal', function() {
		$('#quantity').focus();
	});
}]);
