var Player = require('./models/player');

module.exports = function(app) {
	app.route('/api/players')

	.get(function(req, res) {
		Player.find({}, {name: 1}, 
		function(err, players) {
			if (err) {
				res.send(err)
			} else {
				// prevents IE from caching
				res.setHeader('Cache-Control', 'no-cache');
				res.json(players);
			}
		});
	})

	.post(function(req, res) {
		var player = new Player();
		player.name = req.body['name'];
		player.save(function(err) {
			if (err)
				res.send(err)
			else
				res.json({ message: 'Player ' + player.name + ' created' });
		});
	});


	app.route('/api/players/:player_name')

	.get(function(req, res) {
		Player.findOne({
			'name': req.params.player_name
		}, function(err, player) {
			if (err) {
				console.log('asdasdasdasda');
				res.send(err);
			} else {
				// prevents IE from caching
				res.setHeader('Cache-Control', 'no-cache');
				res.json(player);
			}
		});
	})

	.put(function(req, res) {
		Player.findOne({
			'name': req.params.player_name
		}, function(err, player) {
			if (err) {
				res.send(err);
				return;
			}
			player.containers = req.body['containers'];
			player.save(function(err) {
				if (err)
					res.send(err);
				else
					res.json({
						message: 'Player ' + player.name + ' updated'
					});
			});
		});
	})

	.delete(function(req, res) {
		Player.findOneAndRemove({
			'name': req.params.player_name
		}, function (err, player) {
			if (err)
				res.send(err)
			else
				res.json({ message: 'Successfully deleted' })
		});
	});


	// route to handle all angular request
	app.get('*', function (req, res) {
		res.sendfile('./public/index.html');
	});
};
