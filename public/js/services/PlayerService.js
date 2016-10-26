angular.module('PlayerService', [])
.factory('Players', ['$http', function($http) {
	return {
		get: function(name) {
			if (name == null)
				return $http.get('/api/players');
			else
				return $http.get('/api/players/' + name);
		},
		create: function(playerName) {
			var playerData = { name: playerName };
			return $http.post('api/players', playerData);
		},
		update: function(name, playerData) {
			return $http.put('api/players/' + name, playerData);
		},
		delete: function(name) {
			return $http.delete('/api/players/' + name);
		}
	};
}]);
